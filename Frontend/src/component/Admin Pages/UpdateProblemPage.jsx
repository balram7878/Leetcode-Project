import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";

import axiosClient from "../../utils/axiosClient";

export default function UpdateProblemPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "created_desc";
  const page = Number(searchParams.get("page") || 1);
  const limit = 5;

  // const [limit] = useState(5);

  const [problems, setProblems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProblems = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("problems/getProblems", {
        params: { page, limit, search, sort },
        signal,
      });
      setProblems(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      if (err.name !== "CanceledError") {
        setError("Failed to load problems");
      }
    } finally {
      setLoading(false);
    }
  };

  // Pagination + sort
  useEffect(() => {
    const controller = new AbortController();
    fetchProblems(controller.signal);
    return () => controller.abort();
  }, [page, search, sort]);

  // Search (debounced)
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setPage(1);
      fetchProblems(controller.signal);
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const goPrev = () => {
    if (page > 1) {
      setSearchParams({ search, sort, page: page - 1 });
    }
  };

  const goNext = () => {
    setSearchParams({ search, sort, page: page + 1 });
  };

  const goToPage = (p) => {
    setSearchParams({ search, sort, page: p });
  };

  const MAX_VISIBLE = 5;

  const startPage = Math.max(
    1,
    Math.min(page - Math.floor(MAX_VISIBLE / 2), totalPages - MAX_VISIBLE + 1)
  );

  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE - 1);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Update Problems</h1>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#161616] p-4 rounded-xl border border-gray-800">
          <input
            placeholder="Search by title or problem ID..."
            value={search}
            onChange={(e) =>
              setSearchParams({
                search: e.target.value,
                page: 1, // reset page
                sort,
              })
            }
            className="flex-1 bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 outline-none"
          />

          <select
            value={sort}
            onChange={(e) =>
              setSearchParams({
                search,
                sort: e.target.value,
                page: 1,
              })
            }
            className="bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="created_desc">Newest First</option>
            <option value="created_asc">Oldest First</option>
            <option value="title_asc">Title A–Z</option>
            <option value="title_desc">Title Z–A</option>
          </select>
        </div>

        {/* STATES */}
        {loading && <p className="text-gray-400">Loading problems…</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && problems.length === 0 && (
          <p className="text-gray-400">No problems found</p>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div
              key={problem._id}
              onClick={() => navigate(`/admin/problems/${problem._id}/edit`)}
              className="cursor-pointer bg-[#161616] hover:bg-[#1c1c1c] border border-gray-800 rounded-xl p-5"
            >
              <h2 className="text-lg font-semibold">
                {(page - 1) * limit + index + 1}. {problem.title}
              </h2>

              <div className="text-sm text-gray-400 flex flex-wrap gap-3 mt-1 relative">
                <span>ID: {problem._id}</span>
                <span>Difficulty: {problem.difficulty}</span>
                <span>Tags: {(problem.tags || []).slice(0, 4).join(", ")}</span>
                <span className="border-1 border-gray-700 rounded-lg px-2 py-1 absolute right-2 bottom-[50%]">
                  Created: {new Date(problem.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 pt-6">
          {/* PREV */}
          <button
            onClick={goPrev}
            disabled={page === 1}
            className={`px-3 py-1 rounded-lg border ${
              page === 1
                ? "border-gray-700 text-gray-600 cursor-not-allowed"
                : "border-gray-600 hover:bg-gray-800"
            }`}
          >
            Prev
          </button>

          {/* LEFT ELLIPSIS */}
          {startPage > 1 && <span className="px-2 text-gray-500">…</span>}

          {/* PAGE NUMBERS */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 rounded-lg border ${
                p === page
                  ? "bg-black border-1 border-gray-400 text-white font-semibold"
                  : "border-gray-600 hover:bg-gray-800"
              }`}
            >
              {p}
            </button>
          ))}

          {/* RIGHT ELLIPSIS */}
          {endPage < totalPages && (
            <span className="px-2 text-gray-500">…</span>
          )}

          {/* NEXT */}
          <button
            onClick={goNext}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-lg border ${
              page === totalPages
                ? "border-gray-700 text-gray-600 cursor-not-allowed"
                : "border-gray-600 hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

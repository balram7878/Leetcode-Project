import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClient";

export default function UpdateProblemPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("created_desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

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
  }, [page, sort]);

  // Search (debounced)
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setPage(1);
      fetchProblems(controller.signal);
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const goPrev = () => page > 1 && setPage((p) => p - 1);
  const goNext = () => page < totalPages && setPage((p) => p + 1);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Update Problems</h1>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#161616] p-4 rounded-xl border border-gray-800">
          <input
            placeholder="Search by title or problem ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2 outline-none"
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
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
              onClick={() =>
                navigate(`/admin/problems/${problem._id}/edit`)
              }
              className="cursor-pointer bg-[#161616] hover:bg-[#1c1c1c] border border-gray-800 rounded-xl p-5"
            >
              <h2 className="text-lg font-semibold">
                {(page - 1) * limit + index + 1}. {problem.title}
              </h2>

              <div className="text-sm text-gray-400 flex flex-wrap gap-3 mt-1 relative">
                <span >ID: {problem._id}</span>
                <span>Difficulty: {problem.difficulty}</span>
                <span>
                  Tags: {(problem.tags || []).slice(0, 4).join(", ")}
                </span> 
                <span className="border-1 border-gray-700 rounded-lg px-2 py-1 absolute right-2 bottom-[50%]">
                  Created: {new Date(problem.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 pt-6">
          <button onClick={goPrev} disabled={page === 1}>
            Prev
          </button>

          {[...Array(totalPages)].slice(0, 5).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={p === page ? "font-bold" : ""}
              >
                {p}
              </button>
            );
          })}

          <button onClick={goNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

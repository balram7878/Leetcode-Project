import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClient";
import image from "../../../public/image4.jpg";

const TOPICS = [
  "array",
  "linked-list",
  "stack",
  "queue",
  "binary-search",
  "tree",
  "graph",
  "dp",
];

function Spinner({ size = 6 }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full border-4 border-t-transparent border-white animate-spin`}
    />
  );
}

export default function ProblemsPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "created_desc";
  const page = Number(searchParams.get("page") || 1);
  const topicsQuery = searchParams.get("topics") || "";
  const limit = 4;

  const [searchInput, setSearchInput] = useState(search);
  const [selectedTopics, setSelectedTopics] = useState(
    topicsQuery ? topicsQuery.split(",").filter(Boolean) : [],
  );

  const [problems, setProblems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickLoadingId, setClickLoadingId] = useState(null);

  const fetchProblems = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("problems/getProblems", {
        params: {
          page,
          limit,
          search: searchParams.get("search") || "",
          sort,
          topics: selectedTopics.join(","),
        },
        signal,
      });
      // console.log(res.data);
      // res.data.data.forEach((p) => {
      //   p.isSolved = true; // TODO: mark solved problems based on user data
      // });
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

  // Fetch when page / sort / topics change
  useEffect(() => {
    const controller = new AbortController();
    fetchProblems(controller.signal);
    return () => controller.abort();
  }, [searchInput, page, sort, selectedTopics]);

  // Debounce local search input and update URL params
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({
        search: searchInput,
        sort,
        page: 1,
        topics: selectedTopics.join(","),
      });
    }, 450);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, selectedTopics]);

  useEffect(() => {
    // keep local input synced with URL if user navigates back
    setSearchInput(search);
  }, [search]);

  const toggleTopic = (t) => {
    setSelectedTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const goPrev = () => {
    if (page > 1) {
      setSearchParams({
        search: searchParams.get("search") || "",
        sort,
        page: page - 1,
        topics: selectedTopics.join(","),
      });
    }
  };

  const goNext = () => {
    setSearchParams({
      search: searchParams.get("search") || "",
      sort,
      page: page + 1,
      topics: selectedTopics.join(","),
    });
  };

  const goToPage = (p) => {
    setSearchParams({
      search: searchParams.get("search") || "",
      sort,
      page: p,
      topics: selectedTopics.join(","),
    });
  };

  const MAX_VISIBLE = 5;

  const startPage = Math.max(
    1,
    Math.min(page - Math.floor(MAX_VISIBLE / 2), totalPages - MAX_VISIBLE + 1),
  );

  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE - 1);

  const onProblemClick = (id) => {
    setClickLoadingId(id);
    // navigate to practice page
    navigate(`/practice/${id}`);
  };

  const difficultyClass = (d) => {
    const dd = (d || "").toLowerCase();
    if (dd === "easy") return "bg-green-600 text-black";
    if (dd === "medium") return "bg-yellow-400 text-black";
    if (dd === "hard") return "bg-red-600 text-white";
    return "bg-gray-600";
  };

  return (
    <div className="relative min-h-screen text-gray-200">
      <style>{`@media (max-width:400px){ .problem-meta .meta-inline{display:block;margin-right:0.75rem;} .solved-indicator{margin-left:auto;margin-right:auto;} .solved-placeholder{display:block;width:0.5rem;height:0;margin-top:0.5rem;} }`}</style>
      {/* background image placeholder - replace src with your image path */}
      {/* <img
        src={image}
        alt="page background"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-20"
      /> */}

      <div className="absolute inset-0 bg-[#161616]" />

      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
          {/* Topics */}
          <div className="flex justify-center  p-3 rounded-xl">
            <div className="flex flex-wrap gap-3">
              {TOPICS.map((t) => {
                const active = selectedTopics.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTopic(t)}
                    className={`px-3 py-1 rounded-lg text-sm border ${
                      active
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-transparent border-gray-700 text-gray-300"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <div className="flex-1 bg-[#0b0b0b]/70 border border-gray-800 rounded-xl p-2 flex items-center gap-3">
              <input
                placeholder="Search by title or problem number"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-200"
              />
              <button
                onClick={() => setSearchInput("")}
                className="text-sm text-gray-400 px-3 py-1 hover:text-white"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) =>
                  setSearchParams({
                    search: searchInput,
                    sort: e.target.value,
                    page: 1,
                    topics: selectedTopics.join(","),
                  })
                }
                className="bg-[#0b0b0b]/70 border border-gray-800 rounded-lg px-3 py-4 text-gray-200"
              >
                <option value="created_desc">Newest</option>
                <option value="created_asc">Oldest</option>
                <option value="title_asc">Title A–Z</option>
                <option value="title_desc">Title Z–A</option>
              </select>
            </div>
          </div>

          {/* Status / messages */}
          {loading && (
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-5 h-5 animate-spin border-2 border-t-transparent rounded-full border-white/70" />
              <span>Loading problems…</span>
            </div>
          )}
          {error && <div className="text-red-400">{error}</div>}
          {!loading && problems.length === 0 && (
            <div className="text-gray-400">No problems found</div>
          )}

          {/* List */}
          <div className="flex gap-4 flex-col">
            {problems.map((problem, index) => (
              <div
                key={problem._id}
                onClick={() => onProblemClick(problem._id)}
                className="cursor-pointer relative bg-[#0b0b0b]/60 border border-gray-800 rounded-xl p-5 hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-start gap-4">
                  {/* Left-side solved indicator (only shown when solved) */}
                  {problem.isSolved ? (
                    <div className="flex-shrink-0 mt-3 solved-indicator">
                      <div className="w-8 h-8 -ml-2 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172l-3.293-3.293A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-2 solved-placeholder" />
                  )}

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold">
                          {(page - 1) * limit + index + 1}. {problem.title}
                        </h2>
                        <div className="text-sm text-gray-400 mt-2 problem-meta">
                          <span className="mr-3 meta-inline">ID: {problem._id}</span>
                          <span className="mr-3 meta-inline">
                            Tags: {(problem.tags || []).slice(0, 4).join(", ")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-3 md:mt-0">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs text-white text-center  ${difficultyClass(problem.difficulty || "Easy")}`}
                        >
                          {problem.difficulty || "Easy"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 p-5 m-10">
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

            {startPage > 1 && <span className="px-2 text-gray-500">…</span>}

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i,
            ).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded-lg border ${
                  p === page
                    ? "bg-white/5 border-white/30 text-white font-semibold"
                    : "border-gray-600 hover:bg-gray-800"
                }`}
              >
                {p}
              </button>
            ))}

            {endPage < totalPages && (
              <span className="px-2 text-gray-500">…</span>
            )}

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
      </main>

      <footer className="bg-[#161616] border-t border-gray-800 px-6 py-4 text-center text-sm  text-gray-400 z-10 absolute bottom-0 w-full">
        © {new Date().getFullYear()} CodeTree. Built for coders.
      </footer>
    </div>
  );
}

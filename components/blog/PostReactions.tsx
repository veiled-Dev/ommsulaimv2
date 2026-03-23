"use client";

import { useEffect, useState } from "react";
import { FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";

type Props = {
  slug: string;
  initialReactions: Record<string, number>;
  initialCommentsCount: number;
  initialComments: Array<{ name: string; text: string; date: string }>;
};

type ReactionType = "heart" | "share";

function fmtDate(date: string) {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? "Unknown date"
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PostReactions({ slug, initialReactions, initialCommentsCount, initialComments }: Props) {
  const [reactions, setReactions] = useState({
    comment: Number(initialCommentsCount) || Number(initialReactions.comment) || 0,
    heart: Number(initialReactions.heart) || 0,
    share: Number(initialReactions.share) || 0,
  });
  const [comments, setComments] = useState(initialComments);
  const [busy, setBusy] = useState<ReactionType | "comment" | null>(null);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLiked(localStorage.getItem(`ommsulaim:liked:${slug}`) === "1");
    setShared(localStorage.getItem(`ommsulaim:shared:${slug}`) === "1");
  }, [slug]);

  async function react(type: ReactionType) {
    if (type === "heart" && liked) return;
    if (type === "share" && shared) return;

    setBusy(type);
    setFeedback("");

    try {
      let shareSuccessful = true;

      if (type === "share") {
        const url = window.location.href;

        if (navigator.share) {
          await navigator.share({ url, title: document.title });
          shareSuccessful = true;
        } else {
          await navigator.clipboard.writeText(url);
          shareSuccessful = confirm("Link copied. Click OK only after you have shared the post.");
        }
      }

      if (type === "share" && !shareSuccessful) {
        setFeedback("Share was cancelled, so count was not added.");
        return;
      }

      const response = await fetch(`/api/blog/${slug}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: type }),
      });

      if (!response.ok) {
        throw new Error("Failed to save reaction");
      }

      const json = await response.json();
      setReactions((prev) => ({
        ...prev,
        heart: Number(json.reactions?.heart) || prev.heart,
        share: Number(json.reactions?.share) || prev.share,
      }));

      if (type === "heart") {
        setLiked(true);
        localStorage.setItem(`ommsulaim:liked:${slug}`, "1");
      }

      if (type === "share") {
        setShared(true);
        localStorage.setItem(`ommsulaim:shared:${slug}`, "1");
      }
    } catch {
      setReactions((prev) => ({
        ...prev,
        [type]: (Number(prev[type]) || 0) + 1,
      }));

      if (type === "heart") {
        setLiked(true);
        localStorage.setItem(`ommsulaim:liked:${slug}`, "1");
      }

      if (type === "share") {
        setShared(true);
        localStorage.setItem(`ommsulaim:shared:${slug}`, "1");
      }

      setFeedback("Saved on this device.");
    } finally {
      setBusy(null);
    }
  }

  async function submitComment() {
    const text = commentText.trim();
    if (!text) {
      setFeedback("Write your comment before submitting.");
      return;
    }

    setBusy("comment");
    setFeedback("");
    try {
      const response = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: commentName.trim(), text }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json.error || "Unable to submit comment.");
      }

      const json = await response.json();
      setReactions((prev) => ({
        ...prev,
        comment: Number(json.commentsCount) || prev.comment + 1,
      }));

      if (json.comment?.text) {
        setComments((prev) => [...prev, json.comment]);
      }

      setCommentText("");
      setCommentOpen(false);
      setFeedback("Comment submitted.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to submit comment.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-700">React to this post</h3>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setCommentOpen((prev) => !prev)}
          disabled={busy === "comment"}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-sky-500 hover:text-sky-700 disabled:opacity-60"
          aria-label="Comment reaction"
        >
          <FiMessageCircle /> {reactions.comment}
        </button>

        <button
          type="button"
          onClick={() => react("heart")}
          disabled={busy === "heart" || liked}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-rose-400 hover:text-rose-600 disabled:opacity-60"
          aria-label="Heart reaction"
        >
          <FiHeart /> {reactions.heart} {liked ? "(Liked)" : ""}
        </button>

        <button
          type="button"
          onClick={() => react("share")}
          disabled={busy === "share" || shared}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-amber-400 hover:text-amber-700 disabled:opacity-60"
          aria-label="Share reaction"
        >
          <FiShare2 /> {reactions.share} {shared ? "(Shared)" : ""}
        </button>
      </div>

      {commentOpen && (
        <div className="mt-4 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <input
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={submitComment}
            disabled={busy === "comment"}
            className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 disabled:opacity-60"
          >
            Submit Comment
          </button>
        </div>
      )}

      {feedback && <p className="mt-3 text-sm text-slate-600">{feedback}</p>}

      <div className="mt-5 border-t border-slate-200 pt-4">
        <h4 className="text-sm font-semibold text-slate-700">Comments ({comments.length})</h4>
        {comments.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No comments yet. Be the first to comment.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {comments.map((comment, index) => (
              <article key={`${comment.date}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">{comment.name || "Anonymous"}</p>
                  <p className="text-xs text-slate-500">{fmtDate(comment.date)}</p>
                </div>
                <p className="mt-2 text-sm text-slate-700">{comment.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

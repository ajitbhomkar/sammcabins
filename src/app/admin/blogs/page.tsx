"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", content: "", published: false });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []));
  }, []);

  const handleSave = async () => {
    const method = editingId ? "PUT" : "POST";
    const body = { ...form, id: editingId };
    await fetch("/api/admin/blogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm({ title: "", slug: "", content: "", published: false });
    setEditingId(null);
    // Reload blogs
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []));
  };

  const handleEdit = (blog: any) => {
    setForm({ title: blog.title, slug: blog.slug, content: blog.content, published: blog.published });
    setEditingId(blog.id);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []));
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>
      <form
        className="space-y-4 mb-8"
        onSubmit={e => { e.preventDefault(); handleSave(); }}
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Slug (e.g. my-first-blog)"
          className="w-full border px-3 py-2 rounded"
          value={form.slug}
          onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border px-3 py-2 rounded min-h-[120px]"
          value={form.content}
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
          />
          Published
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded font-bold"
        >
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
        {editingId && (
          <button
            type="button"
            className="ml-4 text-gray-500 underline"
            onClick={() => { setEditingId(null); setForm({ title: "", slug: "", content: "", published: false }); }}
          >
            Cancel
          </button>
        )}
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Blogs</h2>
        {blogs.length === 0 && <p>No blogs yet.</p>}
        <ul className="space-y-4">
          {blogs.map((blog: any) => (
            <li key={blog.id} className="border rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">{blog.title}</span>
                  <span className="ml-2 text-xs text-gray-500">/{blog.slug}</span>
                  {blog.published ? (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Published</span>
                  ) : (
                    <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Draft</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 underline" onClick={() => handleEdit(blog)}>Edit</button>
                  <button className="text-red-600 underline" onClick={() => handleDelete(blog.id)}>Delete</button>
                  {blog.published && (
                    <Link href={`/blog/${blog.slug}`} className="text-green-600 underline" target="_blank">View</Link>
                  )}
                </div>
              </div>
              <div className="mt-2 text-gray-700 text-sm line-clamp-2">{blog.content}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

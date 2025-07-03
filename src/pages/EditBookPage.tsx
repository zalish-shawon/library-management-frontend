"use client"

import type React from "react"

import { useParams, useNavigate } from "react-router-dom"
import { useGetBookQuery, useUpdateBookMutation } from "../features/books/booksApi"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const EditBookPage = () => {
  const { id } = useParams()
  const { data: book, isLoading, error } = useGetBookQuery(id!)
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  })

  useEffect(() => {
    if (book) {
      // Handle both flat object and nested data structure
      const bookData = book.data || book
      setFormData({
        title: bookData.title || "",
        author: bookData.author || "",
        genre: bookData.genre || "",
        isbn: bookData.isbn || "",
        description: bookData.description || "",
        copies: bookData.copies || 1,
        available: bookData.available ?? true,
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    const { name, value, type } = target
    const checked = (target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateBook({ id: id!, data: formData }).unwrap()
      toast.success("Book updated successfully!", { duration: 3000 })
      // Navigate after a short delay to show the toast
      setTimeout(() => navigate("/books"), 1000)
    } catch (error) {
      toast.error("Failed to update book. Please try again.", { duration: 4000 })
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading book</h3>
          <p className="text-red-600 text-sm mt-1">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Book</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              value={formData.title}
              required
              placeholder="Enter book title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              id="author"
              name="author"
              type="text"
              onChange={handleChange}
              value={formData.author}
              required
              placeholder="Enter author name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Genre *
            </label>
            <input
              id="genre"
              name="genre"
              type="text"
              onChange={handleChange}
              value={formData.genre}
              required
              placeholder="Enter book genre"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-2">
              ISBN *
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              onChange={handleChange}
              value={formData.isbn}
              required
              placeholder="Enter ISBN number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              onChange={handleChange}
              value={formData.description}
              placeholder="Enter book description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
            />
          </div>

          <div>
            <label htmlFor="copies" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Copies *
            </label>
            <input
              id="copies"
              name="copies"
              type="number"
              onChange={handleChange}
              value={formData.copies}
              min={1}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
              Available for checkout
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isUpdating ? "Updating..." : "Update Book"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBookPage

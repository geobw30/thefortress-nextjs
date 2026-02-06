"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    galleryImages: 0,
    stories: 0,
  });
  const [userGallery, setUserGallery] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery CRUD state
  const [deletingImage, setDeletingImage] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [savingImage, setSavingImage] = useState(false);

  // Stories CRUD state
  const [deletingStory, setDeletingStory] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [showStoryEditModal, setShowStoryEditModal] = useState(false);
  const [editStoryTitle, setEditStoryTitle] = useState("");
  const [editStoryContent, setEditStoryContent] = useState("");
  const [savingStory, setSavingStory] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  // Fetch user stats
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserStats();
    }
  }, [session]);

  const fetchUserStats = async () => {
    try {
      // Fetch user's gallery images
      const galleryRes = await fetch("/api/gallery");
      const galleryData = await galleryRes.json();

      // Fetch user's stories
      const storiesRes = await fetch("/api/stories");
      const storiesData = await storiesRes.json();

      // Filter by current user
      const userGallery =
        galleryData.images?.filter(
          (img) =>
            img.uploadedBy?._id === session.user.id ||
            img.uploadedBy === session.user.id,
        ) || [];

      const userStories =
        storiesData.stories?.filter(
          (story) =>
            story.uploadedBy?._id === session.user.id ||
            story.uploadedBy === session.user.id,
        ) || [];

      setStats({
        galleryImages: userGallery.length,
        stories: userStories.length,
      });
      setUserGallery(userGallery);
      setUserStories(userStories);
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete story
  const deleteStory = async (storyId) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    setDeletingStory(storyId);
    try {
      const res = await fetch(`/api/stories?id=${storyId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove from local state
        setUserStories((prev) => prev.filter((story) => story._id !== storyId));
        setStats((prev) => ({
          ...prev,
          stories: prev.stories - 1,
        }));
      } else {
        alert("Failed to delete story");
      }
    } catch (error) {
      console.error("Failed to delete story:", error);
      alert("Failed to delete story");
    } finally {
      setDeletingStory(null);
    }
  };

  // Open story edit modal
  const openStoryEditModal = (story) => {
    setEditingStory(story);
    setEditStoryTitle(story.title || "");
    setEditStoryContent(story.content || "");
    setShowStoryEditModal(true);
  };

  // Update story
  const updateStory = async (e) => {
    e.preventDefault();
    setSavingStory(true);

    try {
      const res = await fetch("/api/stories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingStory._id,
          title: editStoryTitle,
          content: editStoryContent,
        }),
      });

      if (res.ok) {
        // Update local state
        setUserStories((prev) =>
          prev.map((story) =>
            story._id === editingStory._id
              ? { ...story, title: editStoryTitle, content: editStoryContent }
              : story
          )
        );
        setShowStoryEditModal(false);
        setEditingStory(null);
      } else {
        alert("Failed to update story");
      }
    } catch (error) {
      console.error("Failed to update story:", error);
      alert("Failed to update story");
    } finally {
      setSavingStory(false);
    }
  };

  // Delete gallery image
  const deleteImage = async (imageId) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setDeletingImage(imageId);
    try {
      const res = await fetch(`/api/gallery?id=${imageId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove from local state
        setUserGallery((prev) => prev.filter((img) => img._id !== imageId));
        setStats((prev) => ({
          ...prev,
          galleryImages: prev.galleryImages - 1,
        }));
      } else {
        alert("Failed to delete image");
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image");
    } finally {
      setDeletingImage(null);
    }
  };

  // Open edit modal
  const openEditModal = (image) => {
    setEditingImage(image);
    setEditTitle(image.title || "");
    setEditDescription(image.description || "");
    setShowEditModal(true);
  };

  // Update gallery image
  const updateImage = async (e) => {
    e.preventDefault();
    setSavingImage(true);

    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingImage._id,
          title: editTitle,
          description: editDescription,
        }),
      });

      if (res.ok) {
        // Update local state
        setUserGallery((prev) =>
          prev.map((img) =>
            img._id === editingImage._id
              ? { ...img, title: editTitle, description: editDescription }
              : img,
          ),
        );
        setShowEditModal(false);
        setEditingImage(null);
      } else {
        alert("Failed to update image");
      }
    } catch (error) {
      console.error("Failed to update image:", error);
      alert("Failed to update image");
    } finally {
      setSavingImage(false);
    }
  };

  // Calculate days active (based on account creation)
  const getDaysActive = () => {
    if (session?.user?.createdAt) {
      const createdAt = new Date(session.user.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - createdAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            User Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, {session?.user?.name}
            </span>
            <button
              onClick={() => router.push("/")}
              className="btn-secondary text-gray-900"
            >
              Back to Site
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "gallery"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Gallery Uploads
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "stories"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Stories
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "profile"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="card p-6">
          {activeTab === "overview" && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard Overview
              </h2>
              <p className="text-gray-600 mb-6">
                Welcome to your dashboard. Here you can manage your gallery
                uploads and stories.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stats.galleryImages}
                  </div>
                  <div className="text-gray-600">Gallery Images</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stats.stories}
                  </div>
                  <div className="text-gray-600">Stories</div>
                </div>
                <div className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {getDaysActive()}
                  </div>
                  <div className="text-gray-600">Days Active</div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push("/gallery")}
                    className="btn-primary"
                  >
                    Upload Gallery Image
                  </button>
                  <button
                    onClick={() => router.push("/stories")}
                    className="btn-primary"
                  >
                    Share Your Story
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                My Gallery Uploads
              </h2>
              <p className="text-gray-600 mb-4">
                View and manage your gallery uploads.
              </p>

              <div className="mb-6">
                <button
                  onClick={() => router.push("/gallery")}
                  className="btn-primary"
                >
                  Upload New Image
                </button>
              </div>

              {userGallery.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-2">
                    You haven&apos;t uploaded any images yet.
                  </p>
                  <button
                    onClick={() => router.push("/gallery")}
                    className="btn-primary"
                  >
                    Upload Your First Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userGallery.map((image) => (
                    <div key={image._id} className="card overflow-hidden">
                      <div
                        className="w-full h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image.imageUrl})` }}
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 truncate">
                          {image.title || "Untitled"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {image.createdAt
                            ? new Date(image.createdAt).toLocaleDateString()
                            : "Recently"}
                        </p>
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => openEditModal(image)}
                            className="text-primary text-sm hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteImage(image._id)}
                            disabled={deletingImage === image._id}
                            className="text-red-600 text-sm hover:underline disabled:opacity-50"
                          >
                            {deletingImage === image._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Edit Image Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Edit Image
                </h3>
                <form onSubmit={updateImage}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter image title"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      rows="3"
                      placeholder="Enter image description"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingImage(null);
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingImage}
                      className="btn-primary disabled:opacity-50"
                    >
                      {savingImage ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "stories" && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                My Stories
              </h2>
              <p className="text-gray-600 mb-4">
                View and manage your stories.
              </p>

              <div className="mb-6">
                <button
                  onClick={() => router.push("/stories")}
                  className="btn-primary"
                >
                  Share New Story
                </button>
              </div>

              {userStories.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-2">
                    You haven&apos;t shared any stories yet.
                  </p>
                  <button
                    onClick={() => router.push("/stories")}
                    className="btn-primary"
                  >
                    Share Your First Story
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userStories.map((story) => (
                        <tr key={story._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {story.title || "Untitled Story"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {story.createdAt
                                ? new Date(story.createdAt).toLocaleDateString()
                                : "Recently"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => openStoryEditModal(story)}
                              className="text-primary hover:underline mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteStory(story._id)}
                              disabled={deletingStory === story._id}
                              className="text-red-600 hover:underline disabled:opacity-50"
                            >
                              {deletingStory === story._id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Edit Story Modal */}
          {showStoryEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-lg w-full p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Edit Story
                </h3>
                <form onSubmit={updateStory}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editStoryTitle}
                      onChange={(e) => setEditStoryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter story title"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      value={editStoryContent}
                      onChange={(e) => setEditStoryContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      rows="6"
                      placeholder="Tell your story..."
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowStoryEditModal(false);
                        setEditingStory(null);
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingStory}
                      className="btn-primary disabled:opacity-50"
                    >
                      {savingStory ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Profile Settings
              </h2>
              <p className="text-gray-600 mb-6">
                Update your profile information.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    defaultValue={session?.user?.name}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    defaultValue={session?.user?.email}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="form-input"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

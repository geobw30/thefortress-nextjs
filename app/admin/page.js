"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    users: 0,
    galleryImages: 0,
    stories: 0,
  });
  const [loading, setLoading] = useState(true);

  // Stories state
  const [stories, setStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [storyForm, setStoryForm] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });
  const [storyError, setStoryError] = useState("");
  const [storySuccess, setStorySuccess] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    storyId: null,
  });

  // Users state
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");
  const [deleteUserConfirm, setDeleteUserConfirm] = useState({
    show: false,
    userId: null,
  });

  // Gallery state
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [galleryError, setGalleryError] = useState("");
  const [gallerySuccess, setGallerySuccess] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [deleteGalleryConfirm, setDeleteGalleryConfirm] = useState({
    show: false,
    galleryId: null,
  });

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user.isAdmin) {
      router.push("/");
    } else {
      // Fetch stats
      fetchStats();
    }
  }, [session, status, router]);

  const fetchStats = async () => {
    try {
      const [usersRes, galleryRes, storiesRes] = await Promise.all([
        fetch("/api/admin/stats/users"),
        fetch("/api/admin/stats/gallery"),
        fetch("/api/admin/stats/stories"),
      ]);

      const usersData = await usersRes.json();
      const galleryData = await galleryRes.json();
      const storiesData = await storiesRes.json();

      setStats({
        users: usersData.count,
        galleryImages: galleryData.count,
        stories: storiesData.count,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }

    // Also fetch recent items for overview
    fetchUsers();
    fetchGallery();
    fetchStories();
  };

  // Fetch stories
  const fetchStories = async () => {
    setStoriesLoading(true);
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      if (data.stories) {
        setStories(data.stories);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setStoriesLoading(false);
    }
  };

  // Fetch stories when stories tab is active
  useEffect(() => {
    if (activeTab === "stories" && stories.length === 0) {
      fetchStories();
    }
  }, [activeTab]);

  // Reset story form
  const resetStoryForm = () => {
    setStoryForm({
      title: "",
      content: "",
      author: "",
      imageUrl: "",
    });
    setEditingStory(null);
    setStoryError("");
    setStorySuccess("");
  };

  // Open modal for creating new story
  const handleCreateStory = () => {
    resetStoryForm();
    setShowStoryModal(true);
  };

  // Open modal for editing story
  const handleEditStory = (story) => {
    setStoryForm({
      title: story.title,
      content: story.content,
      author: story.author,
      imageUrl: story.imageUrl || "",
    });
    setEditingStory(story);
    setShowStoryModal(true);
  };

  // Submit story form (create or update)
  const handleStorySubmit = async (e) => {
    e.preventDefault();
    setStoryError("");
    setStorySuccess("");

    try {
      const url = "/api/stories";
      const method = editingStory ? "PUT" : "POST";
      const body = editingStory
        ? { ...storyForm, id: editingStory._id }
        : storyForm;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save story");
      }

      setStorySuccess(
        editingStory
          ? "Story updated successfully!"
          : "Story created successfully!",
      );
      fetchStories();
      fetchStats();

      // Close modal after short delay
      setTimeout(() => {
        setShowStoryModal(false);
        resetStoryForm();
      }, 1500);
    } catch (error) {
      setStoryError(error.message);
    }
  };

  // Delete story
  const handleDeleteStory = async (storyId) => {
    try {
      const res = await fetch(`/api/stories?id=${storyId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete story");
      }

      fetchStories();
      fetchStats();
      setDeleteConfirm({ show: false, storyId: null });
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fetch users
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch users when users tab is active
  useEffect(() => {
    if (activeTab === "users" && users.length === 0) {
      fetchUsers();
    }
  }, [activeTab]);

  // Reset user form
  const resetUserForm = () => {
    setUserForm({
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    setEditingUser(null);
    setUserError("");
    setUserSuccess("");
  };

  // Open modal for creating new user
  const handleCreateUser = () => {
    resetUserForm();
    setShowUserModal(true);
  };

  // Open modal for editing user
  const handleEditUser = (user) => {
    setUserForm({
      name: user.name,
      email: user.email,
      password: "",
      isAdmin: user.isAdmin,
    });
    setEditingUser(user);
    setShowUserModal(true);
  };

  // Submit user form (create or update)
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserError("");
    setUserSuccess("");

    try {
      const url = "/api/users";
      const method = editingUser ? "PUT" : "POST";
      const body = editingUser
        ? { ...userForm, id: editingUser._id }
        : userForm;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save user");
      }

      setUserSuccess(
        editingUser
          ? "User updated successfully!"
          : "User created successfully!",
      );
      fetchUsers();
      fetchStats();

      // Close modal after short delay
      setTimeout(() => {
        setShowUserModal(false);
        resetUserForm();
      }, 1500);
    } catch (error) {
      setUserError(error.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      const res = await fetch(`/api/users?id=${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      fetchUsers();
      fetchStats();
      setDeleteUserConfirm({ show: false, userId: null });
    } catch (error) {
      console.error("Delete user error:", error);
      alert(error.message);
    }
  };

  // Fetch gallery
  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.images) {
        setGallery(data.images);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setGalleryLoading(false);
    }
  };

  // Fetch gallery when gallery tab is active
  useEffect(() => {
    if (activeTab === "gallery" && gallery.length === 0) {
      fetchGallery();
    }
  }, [activeTab]);

  // Reset gallery form
  const resetGalleryForm = () => {
    setGalleryForm({
      title: "",
      description: "",
      imageUrl: "",
    });
    setGalleryImageFile(null);
    setEditingGallery(null);
    setGalleryError("");
    setGallerySuccess("");
  };

  // Handle image file change
  const handleGalleryImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGalleryImageFile(e.target.files[0]);
      // Create a local preview URL
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setGalleryForm({ ...galleryForm, imageUrl: objectUrl });
    }
  };

  // Open modal for creating new gallery image
  const handleCreateGallery = () => {
    resetGalleryForm();
    setShowGalleryModal(true);
  };

  // Open modal for editing gallery image
  const handleEditGallery = (item) => {
    setGalleryForm({
      title: item.title,
      description: item.description || "",
      imageUrl: item.imageUrl,
    });
    setEditingGallery(item);
    setShowGalleryModal(true);
  };

  // Submit gallery form (create or update)
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setGalleryError("");
    setGallerySuccess("");
    setGalleryUploading(true);

    try {
      // For new uploads with a file, use the upload API with FormData
      if (!editingGallery && galleryImageFile) {
        const formData = new FormData();
        formData.append("title", galleryForm.title);
        formData.append("description", galleryForm.description);
        formData.append("image", galleryImageFile);

        const res = await fetch("/api/gallery/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to upload image");
        }

        setGallerySuccess("Gallery image uploaded successfully!");
        fetchGallery();
        fetchStats();

        // Close modal after short delay
        setTimeout(() => {
          setShowGalleryModal(false);
          resetGalleryForm();
        }, 1500);
      } else {
        // For editing existing images or URL-based uploads
        const url = "/api/gallery";
        const method = editingGallery ? "PUT" : "POST";
        const body = editingGallery
          ? { ...galleryForm, id: editingGallery._id }
          : galleryForm;

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to save gallery image");
        }

        setGallerySuccess(
          editingGallery
            ? "Gallery image updated successfully!"
            : "Gallery image uploaded successfully!",
        );
        fetchGallery();
        fetchStats();

        // Close modal after short delay
        setTimeout(() => {
          setShowGalleryModal(false);
          resetGalleryForm();
        }, 1500);
      }
    } catch (error) {
      setGalleryError(error.message);
    } finally {
      setGalleryUploading(false);
    }
  };

  // Delete gallery image
  const handleDeleteGallery = async (galleryId) => {
    try {
      const res = await fetch(`/api/gallery?id=${galleryId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete gallery image");
      }

      fetchGallery();
      fetchStats();
      setDeleteGalleryConfirm({ show: false, galleryId: null });
    } catch (error) {
      console.error("Delete gallery error:", error);
      alert(error.message);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || !session.user.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Admin Dashboard
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Users
                </h3>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats.users}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Gallery Images
                </h3>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats.galleryImages}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Stories</h3>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats.stories}
                </p>
              </div>
            </div>
          </div>
        </div>

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
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "gallery"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "stories"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Stories
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
              <p className="text-gray-600">
                Welcome to the admin dashboard. Here you can manage users,
                gallery images, and stories.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Quick Actions
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setActiveTab("users")}
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        Add New User
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("gallery")}
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Upload Gallery Image
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("stories")}
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Create New Story
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Recent Activity
                  </h3>
                  {users.length > 0 ||
                  gallery.length > 0 ||
                  stories.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {users.slice(0, 2).map((user) => (
                        <li
                          key={user._id}
                          className="text-gray-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          New user: {user.name}
                        </li>
                      ))}
                      {gallery.slice(0, 2).map((item) => (
                        <li
                          key={item._id}
                          className="text-gray-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Gallery: {item.title}
                        </li>
                      ))}
                      {stories.slice(0, 2).map((story) => (
                        <li
                          key={story._id}
                          className="text-gray-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          Story: {story.title}
                        </li>
                      ))}
                      {users.length === 0 &&
                        gallery.length === 0 &&
                        stories.length === 0 && (
                          <li className="text-gray-500 italic">
                            No recent activity
                          </li>
                        )}
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      <li className="text-gray-500 italic">
                        No recent activity
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    User Management
                  </h2>
                  <p className="text-gray-600">
                    Manage user accounts and permissions.
                  </p>
                </div>
                <button
                  onClick={handleCreateUser}
                  className="btn-primary flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New User
                </button>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="text-gray-500 mb-4">No users found</p>
                  <button
                    onClick={handleCreateUser}
                    className="text-primary hover:underline"
                  >
                    Create your first user
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Joined
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
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-medium">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.isAdmin
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.isAdmin ? "Admin" : "User"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(user.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-primary hover:underline mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setDeleteUserConfirm({
                                  show: true,
                                  userId: user._id,
                                })
                              }
                              className="text-red-600 hover:underline"
                            >
                              Delete
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

          {activeTab === "gallery" && (
            <div className="fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Gallery Management
                  </h2>
                  <p className="text-gray-600">
                    Manage gallery images uploaded by users.
                  </p>
                </div>
                <button
                  onClick={handleCreateGallery}
                  className="btn-primary flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Upload Image
                </button>
              </div>

              {galleryLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : gallery.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 mb-4">No gallery images found</p>
                  <button
                    onClick={handleCreateGallery}
                    className="text-primary hover:underline"
                  >
                    Upload your first image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map((item) => (
                    <div key={item._id} className="card overflow-hidden group">
                      <div className="relative aspect-[4/3] bg-gray-100">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleEditGallery(item)}
                            className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <svg
                              className="w-5 h-5 text-gray-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setDeleteGalleryConfirm({
                                show: true,
                                galleryId: item._id,
                              })
                            }
                            className="bg-white p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <svg
                              className="w-5 h-5 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {item.uploadedBy?.name
                            ? `Uploaded by ${item.uploadedBy.name}`
                            : "Unknown"}{" "}
                          • {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "stories" && (
            <div className="fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Story Management
                  </h2>
                  <p className="text-gray-600">
                    Manage stories and testimonials submitted by users.
                  </p>
                </div>
                <button
                  onClick={handleCreateStory}
                  className="btn-primary flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add New Story
                </button>
              </div>

              {storiesLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : stories.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 mb-4">No stories found</p>
                  <button
                    onClick={handleCreateStory}
                    className="text-primary hover:underline"
                  >
                    Create your first story
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
                          Author
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
                      {stories.map((story) => (
                        <tr key={story._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {story.imageUrl && (
                                <img
                                  src={story.imageUrl}
                                  alt={story.title}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                              )}
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                {story.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {story.author}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(story.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleEditStory(story)}
                              className="text-primary hover:underline mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  show: true,
                                  storyId: story._id,
                                })
                              }
                              className="text-red-600 hover:underline"
                            >
                              Delete
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
        </div>
      </main>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowStoryModal(false)}
            ></div>

            <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingStory ? "Edit Story" : "Create New Story"}
                </h3>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {storyError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {storyError}
                </div>
              )}

              {storySuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  {storySuccess}
                </div>
              )}

              <form onSubmit={handleStorySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={storyForm.title}
                    onChange={(e) =>
                      setStoryForm({ ...storyForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter story title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={storyForm.author}
                    onChange={(e) =>
                      setStoryForm({ ...storyForm, author: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={storyForm.imageUrl}
                    onChange={(e) =>
                      setStoryForm({ ...storyForm, imageUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    value={storyForm.content}
                    onChange={(e) =>
                      setStoryForm({ ...storyForm, content: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Write the story content here..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingStory ? "Update Story" : "Create Story"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, storyId: null })}
        onConfirm={() => handleDeleteStory(deleteConfirm.storyId)}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmStyle="danger"
      />

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowUserModal(false)}
            ></div>

            <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingUser ? "Edit User" : "Create New User"}
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {userError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {userError}
                </div>
              )}

              {userSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  {userSuccess}
                </div>
              )}

              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={userForm.name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter user name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingUser
                        ? "New Password (leave blank to keep current)"
                        : "Password *"}
                    </label>
                    <input
                      type="password"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter password"
                      {...(editingUser ? {} : { required: true })}
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userForm.isAdmin}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            isAdmin: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Admin User
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUserModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingUser ? "Update User" : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteUserConfirm.show}
        onClose={() => setDeleteUserConfirm({ show: false, userId: null })}
        onConfirm={() => handleDeleteUser(deleteUserConfirm.userId)}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmStyle="danger"
      />

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowGalleryModal(false)}
            ></div>

            <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingGallery
                    ? "Edit Gallery Image"
                    : "Upload Gallery Image"}
                </h3>
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {galleryError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {galleryError}
                </div>
              )}

              {gallerySuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  {gallerySuccess}
                </div>
              )}

              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Title *
                  </label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter image title"
                    required
                  />
                </div>

                {!editingGallery ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image File *
                    </label>
                    <input
                      type="file"
                      onChange={handleGalleryImageChange}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required={!editingGallery}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL (for editing)
                    </label>
                    <input
                      type="url"
                      value={galleryForm.imageUrl}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                {galleryForm.imageUrl && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preview
                    </label>
                    <img
                      src={galleryForm.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle'%3EImage not available%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    value={galleryForm.description}
                    onChange={(e) =>
                      setGalleryForm({
                        ...galleryForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Enter a description for this image"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowGalleryModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={galleryUploading}
                    className="btn-primary disabled:opacity-50"
                  >
                    {galleryUploading
                      ? "Uploading..."
                      : editingGallery
                        ? "Update Image"
                        : "Upload Image"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Gallery Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteGalleryConfirm.show}
        onClose={() =>
          setDeleteGalleryConfirm({ show: false, galleryId: null })
        }
        onConfirm={() => handleDeleteGallery(deleteGalleryConfirm.galleryId)}
        title="Delete Gallery Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmStyle="danger"
      />
    </div>
  );
};

export default AdminDashboard;

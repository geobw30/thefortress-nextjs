import mongoose from "mongoose";
import Gallery from "@/models/Gallery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Connect to MongoDB helper
async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

// GET - Fetch all gallery images
export async function GET(request) {
  try {
    await connectDB();

    // Fetch gallery images
    const galleryImages = await Gallery.find({})
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ images: galleryImages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST - Create a new gallery image
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    const body = await request.json();
    const { title, description, imageUrl } = body;

    if (!title || !imageUrl) {
      return new Response(
        JSON.stringify({ error: "Title and image URL are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const galleryItem = new Gallery({
      title,
      description: description || "",
      imageUrl,
      uploadedBy: session.user.id,
    });

    await galleryItem.save();

    return new Response(
      JSON.stringify({
        message: "Gallery image uploaded successfully",
        image: galleryItem,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Gallery upload error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT - Update a gallery image
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    const body = await request.json();
    const { id, title, description, imageUrl } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Gallery image ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return new Response(
        JSON.stringify({ error: "Gallery image not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if user is admin or the owner
    if (
      !session.user.isAdmin &&
      galleryItem.uploadedBy.toString() !== session.user.id
    ) {
      return new Response(
        JSON.stringify({ error: "Not authorized to update this image" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    // Update fields
    if (title) galleryItem.title = title;
    if (description !== undefined) galleryItem.description = description;
    if (imageUrl) galleryItem.imageUrl = imageUrl;

    await galleryItem.save();

    return new Response(
      JSON.stringify({
        message: "Gallery image updated successfully",
        image: galleryItem,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Gallery update error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE - Delete a gallery image
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Gallery image ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return new Response(
        JSON.stringify({ error: "Gallery image not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if user is admin or the owner
    if (
      !session.user.isAdmin &&
      galleryItem.uploadedBy.toString() !== session.user.id
    ) {
      return new Response(
        JSON.stringify({ error: "Not authorized to delete this image" }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    await Gallery.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Gallery image deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Gallery delete error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

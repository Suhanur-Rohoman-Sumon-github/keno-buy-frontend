"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CategoryPage() {
  const [categories, setCategories] = useState<string[]>([
    "Electronics",
    "Fashion",
    "Books",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {/* Add Category */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleAddCategory}>Add</Button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-4 border rounded shadow hover:bg-gray-50 transition"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

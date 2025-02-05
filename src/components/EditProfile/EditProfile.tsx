"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/services/userServices";

const EditProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  const userData = user?.response?.user;
  const token = user?.response?.token;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData || !token) {
      alert("User data not found. Please try again.");
      return;
    }

    try {
      const updatedUser = await updateUserProfile(formData, userData.id, token);

      await updateUser({
        ...userData,
        ...updatedUser,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-black-dark">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl text-center text-gold-soft mb-4">
          Edit Profile
        </h1>

        <div className="bg-black-dark p-6 rounded-lg shadow-lg border border-gold-soft/10">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--white-ivory)" }}
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-black-light text-white-ivory p-2 rounded-md border border-gold-soft/20 focus:border-gold-soft/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-gold-soft/10">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg border border-gold-soft/20 text-gold-soft/70 hover:text-gold-soft hover:border-gold-soft/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gold-soft/20 text-gold-soft hover:bg-gold-soft/30 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

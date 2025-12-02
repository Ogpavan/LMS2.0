import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    email: "test@example.com",
    name: "Test User",
    role: "student",
    permissions: getPermissionsByRole("student"),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const signin = async (credentials) => {
    try {
      // Mock authentication - replace with actual API call
      const mockUser = {
        id: 1,
        email: credentials.email,
        name: "John Doe",
        role: "student", // Can be 'admin', 'instructor', 'student'
        permissions: getPermissionsByRole("student"),
      };

      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Mock registration - replace with actual API call
      const newUser = {
        id: Date.now(),
        ...userData,
        role: "student", // Default role
        permissions: getPermissionsByRole("student"),
      };

      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission);
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    signin,
    signup,
    signout,
    hasRole,
    hasPermission,
    hasAnyRole,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Role-based permissions
const getPermissionsByRole = (role) => {
  const permissions = {
    admin: [
      "view_dashboard",
      "manage_users",
      "manage_courses",
      "manage_assignments",
      "manage_quizzes",
      "view_reports",
      "manage_settings",
    ],
    instructor: [
      "view_dashboard",
      "manage_courses",
      "manage_assignments",
      "manage_quizzes",
      "view_students",
      "grade_assignments",
      "view_reports",
    ],
    student: [
      "view_dashboard",
      "view_courses",
      "submit_assignments",
      "take_quizzes",
      "view_grades",
    ],
  };

  return permissions[role] || [];
};

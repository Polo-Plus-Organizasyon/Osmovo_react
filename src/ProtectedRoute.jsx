import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token =
    typeof window !== "undefined" &&
    (localStorage.getItem("authToken"));

  const [isValid, setIsValid] = useState(null); // null = loading, true = geçerli, false = geçersiz

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await axios.get("https://api.osmovo.com/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Eğer API başarılı döndüyse
        if (res.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.error("Token validation failed:", err);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    // yükleniyor state
    return <div>Yükleniyor...</div>;
  }

  if (!isValid) {
    return (
<Navigate
  to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
  replace
/>
    );
  }

  return children;
}

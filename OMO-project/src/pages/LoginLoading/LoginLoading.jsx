import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";

const LoginLoading = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);

      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");
      const isExistingMember = params.get("isExistingMember");
      const memberRole = params.get("memberRole");

      if (!accessToken) {
        console.error("No access token found");
        navigate("/Login");
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("isExistingMember", isExistingMember);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("memberRole", memberRole);

      if (isExistingMember === "true") {
        navigate("/"); // 기존 멤버일 경우 홈 페이지로 이동
        setIsLoggedIn(true);
      } else {
        navigate("/Signup"); // 새 멤버일 경우 회원가입 페이지로 이동
        setIsLoggedIn(true);
      }

      setLoading(false);
    };

    handleLogin();
  }, [navigate, setIsLoggedIn]);

  if (loading) {
    return <Loading />;
  }

  return null;
};

export default LoginLoading;

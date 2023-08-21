import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import stSettings from "../../configs/storageSettings.json";
import { IUser } from "../../models/IUser";
import { Profile } from "./Profile";
import { TicketsList } from "./TicketsList";
import { useFetch } from "../../hooks/useFetch";
import { ApiContext } from "../../contexts/ApiContext";
import { useState } from "react";
import { ITicket } from "../../models/_api/ITicket";
import { Loading } from "../../components/Loading";
import { AuthContext } from "../../contexts/AuthContext";
import { CustomButton } from "../../components/UI/Button/CustomButton";

interface UserAccountProps {}

export const UserAccount = ({}: UserAccountProps) => {
  const { api_domain } = useContext(ApiContext);
  const { getTicketsForUser, loading } = useFetch(api_domain);
  const [tickets, setTickets] = useState<ITicket[] | null>(null);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();

    navigate("/login");
  };

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        const result = await getTicketsForUser(user!.id);
        console.log(result);
        if (result.code === "200") {
          setTickets(result.data as ITicket[]);
        }
        if (result.code === "404") {
          await logout();
        }
      };

      fetchData();
    }
  }, []);
  console.log(tickets);
  return (
    <div>
      {user ? <Profile user={user} /> : null}
      {loading ? <Loading message='Loading tickets...' /> : null}
      <TicketsList tickets={tickets} />
      <div>
        <CustomButton onClick={handleLogout}>Logout custom</CustomButton>
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AddUser } from "./add-user";
import { Users } from "./users";
import { UserPage } from "./UserPage";

export const App: React.FC = () => (
    <Router>
        <div className="p-4 space-y-8">
            <Routes>
                <Route index element={<Users />} />
                <Route path="/users/:id" element={<UserPage />} />
            </Routes>
        </div>
    </Router>
);

export default App;

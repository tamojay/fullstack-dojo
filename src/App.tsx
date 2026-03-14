import { Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { RequireAuth } from "./components/auth/RequireAuth";
import { SignIn } from "./pages/signin/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { DsaIndex } from "./pages/dsa/DsaIndex";
import { DsaTopic } from "./pages/dsa/DsaTopic";
import { AdvancedDsaIndex } from "./pages/advanced-dsa/AdvancedDsaIndex";
import { JsFundamentalsIndex } from "./pages/js-fundamentals/JsFundamentalsIndex";
import { ReactWebIndex } from "./pages/react-web/ReactWebIndex";
import { FrontendCodingIndex } from "./pages/frontend-coding/FrontendCodingIndex";
import { FrontendDesignIndex } from "./pages/frontend-system-design/FrontendDesignIndex";
import { BackendDesignIndex } from "./pages/backend-system-design/BackendDesignIndex";

export function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dsa" element={<DsaIndex />} />
          <Route path="/dsa/:topicId" element={<DsaTopic />} />
          <Route path="/advanced-dsa" element={<AdvancedDsaIndex />} />
          <Route path="/js-fundamentals" element={<JsFundamentalsIndex />} />
          <Route path="/react-web" element={<ReactWebIndex />} />
          <Route path="/frontend-coding" element={<FrontendCodingIndex />} />
          <Route path="/frontend-system-design" element={<FrontendDesignIndex />} />
          <Route path="/backend-system-design" element={<BackendDesignIndex />} />
        </Route>
      </Route>
    </Routes>
  );
}

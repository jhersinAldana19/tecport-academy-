import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CourseProvider } from "@/contexts/CourseContext";
import { TEMP_ACCESS } from "@/config/tempAccess";
import Index from "./pages/Index";
import CourseDetail from "./pages/CourseDetail";
import LearningView from "./pages/LearningView";
import MyCourses from "./pages/MyCourses";
import TecportStaff from "./pages/TecportStaff";
import TecportStaffLearningView from "./pages/TecportStaffLearningView";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCourseEditor from "./pages/admin/AdminCourseEditor";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";
import { LibraryPage } from "./pages/library/LibraryPage";
import { EquipmentLibraryPage } from "./pages/library/EquipmentLibraryPage";
import { ManualPage } from "./pages/library/ManualPage";
import { PdfViewerPage } from "./pages/library/PdfViewerPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <CourseProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/academy/tecport-staff" replace />} />
                <Route path="/academy" element={<Index />} />
                <Route
                  path="/academy/course/:slug"
                  element={
                    TEMP_ACCESS.publicCoursesEnterable ? (
                      <CourseDetail />
                    ) : (
                      <Navigate to="/academy" replace />
                    )
                  }
                />
                <Route
                  path="/academy/course/:slug/learn"
                  element={
                    TEMP_ACCESS.publicCoursesEnterable ? (
                      <LearningView />
                    ) : (
                      <Navigate to="/academy" replace />
                    )
                  }
                />
                <Route path="/academy/my-courses" element={<MyCourses />} />
                <Route path="/academy/tecport-staff" element={<TecportStaff />} />
                <Route
                  path="/academy/tecport-staff/course/:courseId/learn"
                  element={<TecportStaffLearningView />}
                />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/library/:equipmentId" element={<EquipmentLibraryPage />} />
                <Route path="/library/:equipmentId/:manualId" element={<ManualPage />} />
                <Route path="/library/:equipmentId/:manualId/view/:documentId" element={<PdfViewerPage />} />
                {TEMP_ACCESS.adminEnabled ? (
                  <Route path="/academy/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="courses/new" element={<AdminCourseEditor />} />
                    <Route path="courses/:id/edit" element={<AdminCourseEditor />} />
                    <Route path="users" element={<AdminUsers />} />
                  </Route>
                ) : (
                  <Route path="/academy/admin/*" element={<Navigate to="/academy/tecport-staff" replace />} />
                )}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CourseProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

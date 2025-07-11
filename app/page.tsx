import { SkillForm } from "@/components/skills/skill-form";
import { FileUploadArea } from "@/components/upload/file-upload-area";
import { FormProvider } from "@/contexts/form-context";

export default function Home() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-32px)]">
            <div className="overflow-hidden">
              <SkillForm />
            </div>
            <div className="overflow-hidden">
              <FileUploadArea />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

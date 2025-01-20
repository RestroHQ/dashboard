"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFileUpload } from "@/hooks/use-files";
import {
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
} from "@/hooks/use-restaurant";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { createId } from "@paralleldrive/cuid2";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Additional } from "./additional";
import { BasicInfo } from "./basic";
import { ContactInfo } from "./contact";
import { Hours } from "./hours";
import { defaultValues, restaurantSchema } from "./schema";

const OnboardingWizard = ({ className }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState({ logo: null, coverImage: null });

  const form = useForm({
    resolver: zodResolver(restaurantSchema),
    defaultValues: defaultValues,
  });

  const { mutateAsync: mutateFileUpload } = useFileUpload({
    onError: (error) => {
      console.error("Error handling file:", error);
    },
  });

  const { mutateAsync: mutateCreateRestaurant } = useCreateRestaurantMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Restaurant details saved successfully!",
      });
    },
    onError: (error) => {
      console.error("Error creating restaurant:", error);
    },
  });

  const { mutateAsync: updateRestaurant } = useUpdateRestaurantMutation({});

  const uploadFiles = async (restaurantId) => {
    const uploadedFiles = {};
    const uploadErrors = [];

    if (files.logo) {
      try {
        const { path } = await mutateFileUpload({
          file: files.logo,
          type: "LOGO",
          entityId: restaurantId,
        });
        uploadedFiles.logo = path;
      } catch (error) {
        uploadErrors.push("Logo upload failed");
      }
    }

    if (files.coverImage) {
      try {
        const { path } = await mutateFileUpload({
          file: files.coverImage,
          type: "COVER",
          entityId: restaurantId,
        });
        uploadedFiles.coverImage = path;
      } catch (error) {
        uploadErrors.push("Cover image upload failed");
      }
    }

    if (uploadErrors.length > 0) {
      toast({
        title: "File Upload Warning",
        description: (
          <ul className="list-disc pl-4">
            {uploadErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ),
        variant: "destructive",
      });
    }

    return uploadedFiles;
  };

  const onSubmit = async (values) => {
    const restaurantId = createId();

    try {
      await mutateCreateRestaurant({
        id: restaurantId,
        ...values,
        logo: null,
        coverImage: null,
      });

      const uploadedFiles = await uploadFiles(restaurantId);

      if (Object.keys(uploadedFiles).length > 0) {
        await updateRestaurant({
          id: restaurantId,
          ...uploadedFiles,
        });
      }

      form.reset();
      setFiles({ logo: null, coverImage: null });
      router.push(`/${restaurantId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while creating the restaurant. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onError = (error) => {
    console.log(error);
    toast({
      title: "Error While Submitting",
      description: (
        <ul className="list-disc pl-4">
          {Object.values(error).map((e, i) => (
            <li key={i}>{e.message}</li>
          ))}
        </ul>
      ),
      variant: "destructive",
    });
  };

  const tabs = [
    { name: "Basic Information", component: <BasicInfo form={form} /> },
    { name: "Contact Information", component: <ContactInfo form={form} /> },
    { name: "Operating Hours", component: <Hours form={form} /> },
    {
      name: "Additional Information",
      component: <Additional form={form} files={files} setFiles={setFiles} />,
    },
  ];

  return (
    <section className={cn("w-full h-full", className)}>
      <section className="flex items-start gap-8">
        <div className="min-w-60">
          <h1 className="text-2xl font-bold mb-8">Create Your Restaurant</h1>

          <div className="relative flex flex-col gap-4 mx-auto mb-4">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="flex items-center text-sm gap-2 cursor-pointer"
                onClick={() => setStep(index)}
              >
                <Check
                  className={cn(
                    "w-4 h-4",
                    step >= index ? "text-green-500" : "text-gray-300",
                  )}
                />
                <span className="text-gray-600">{tab.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <div className="flex flex-col w-full">
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-6 min-h-96"
            >
              {tabs[step].component}
            </form>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
              >
                Back
              </Button>

              {step !== tabs.length - 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(step + 1)}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmit, onError)}
                >
                  Create Restaurant
                </Button>
              )}
            </div>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default OnboardingWizard;

"use client";

import LogoWithText from "@/components/common/logo-with-text";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFileUpload } from "@/hooks/use-files";
import { useCreateRestaurantMutation } from "@/hooks/use-restaurant";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { createId } from "@paralleldrive/cuid2";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Additional } from "./additional";
import { BasicInfo } from "./basic";
import { ContactInfo } from "./contact";
import { Hours } from "./hours";
import { defaultValues, restaurantSchema } from "./schema";
import { useRouter } from "next/navigation";

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
    onSuccess: () => {
      console.log("File upload completed");
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
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

  const onSubmit = async (values) => {
    try {
      const restaurantId = createId();

      if (files.logo) {
        const { path } = await mutateFileUpload({
          file: files.logo,
          type: "LOGO",
          entityId: restaurantId,
        });

        values.logo = path;
      }

      if (files.coverImage) {
        const { path } = await mutateFileUpload({
          file: files.coverImage,
          type: "COVER",
          entityId: restaurantId,
        });

        values.coverImage = path;
      }

      await mutateCreateRestaurant({ id: restaurantId, ...values });

      // form.reset();
      // setFiles({ logo: null, coverImage: null });

      // router.push(`/${restaurantId}`);
    } catch (error) {
      console.error("Error submitting form:", error);

      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
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
    { name: "Basic Infomation", component: <BasicInfo form={form} /> },
    { name: "Contact Information", component: <ContactInfo form={form} /> },
    { name: "Operating Hours", component: <Hours form={form} /> },
    {
      name: "Additional Infomation",
      component: <Additional form={form} files={files} setFiles={setFiles} />,
    },
  ];

  return (
    <secion
      className={cn(
        "min-h-screen flex flex-col justify-center items-center py-8 px-4",
        className,
      )}
    >
      <section className="w-full max-w-4xl border p-8 rounded-lg">
        <section className="flex items-start gap-8">
          <div className="min-w-60">
            <LogoWithText icon="w-6 h-6" text="text-xl" className="mb-4" />

            <hr className="border-t border-gray-200 my-4" />

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
    </secion>
  );
};

export default OnboardingWizard;

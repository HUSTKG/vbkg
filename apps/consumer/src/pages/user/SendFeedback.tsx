// pages/user/SendFeedback.tsx
import { useState } from "react";
import {
  AppLayout,
  Card,
  Button,
  Input,
  SuccessNotification,
  ErrorNotification,
} from "@vbkg/ui";

interface FeedbackForm {
  type: "Bug Report" | "Feature Request" | "General Feedback";
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}

export default function SendFeedback() {
  const [form, setForm] = useState<FeedbackForm>({
    type: "General Feedback",
    title: "",
    description: "",
    priority: "Medium",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      // Implement feedback submission logic
      console.log("Submitting feedback:", form);
      setSuccess(true);
      setForm({
        type: "General Feedback",
        title: "",
        description: "",
        priority: "Medium",
      });
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
    }
  };

  const handleChange = (name: keyof FeedbackForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Send Feedback</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Feedback Type
              </label>
              <select
                className="w-full border rounded-md p-2"
                value={form.type}
                onChange={(e) =>
                  handleChange("type", e.target.value as FeedbackForm["type"])
                }
              >
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>General Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Brief summary of your feedback"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[200px]"
                placeholder="Detailed description of your feedback"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                className="w-full border rounded-md p-2"
                value={form.priority}
                onChange={(e) =>
                  handleChange(
                    "priority",
                    e.target.value as FeedbackForm["priority"],
                  )
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {success && (
              <SuccessNotification
                title="Success"
                message="Your feedback has been submitted successfully."
                id="feedback-success"
                time={new Date().toISOString()}
              />
            )}

            {error && (
              <ErrorNotification
                time={new Date().toISOString()}
                id="feedback-error"
                title="Error"
                message={error}
              />
            )}

            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}

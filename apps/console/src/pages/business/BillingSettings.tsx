import { useState } from "react";
import {
  Card,
  Button,
  Table,
  StatisticCard,
  ConfirmDialog,
  SuccessNotification,
  ErrorNotification,
} from "@vbkg/ui";

interface BillingPlan {
  id: string;
  name: string;
  price: number;
  apiCalls: number;
  storage: number;
  users: number;
  features: string[];
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  description: string;
}

export default function BillingSettings() {
  const [currentPlan] = useState<BillingPlan>({
    id: "business",
    name: "Business Plan",
    price: 299,
    apiCalls: 100000,
    storage: 10,
    users: 10,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      date: "2024-04-01",
      amount: 299,
      status: "Paid",
      description: "Business Plan - April 2024",
    },
    {
      id: "INV-002",
      date: "2024-03-01",
      amount: 299,
      status: "Paid",
      description: "Business Plan - March 2024",
    },
  ]);

  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <Button onClick={() => setShowUpgradeDialog(true)}>Upgrade Plan</Button>
      </div>

      {/* Notifications */}
      {notification &&
        (notification.type === "success" ? (
          <SuccessNotification
            title="Success"
            message={notification.message}
            onDelete={() => setNotification(null)}
            id="notification"
            time={new Date().toLocaleTimeString()}
          />
        ) : (
          <ErrorNotification
            title="Error"
            message={notification.message}
            onDelete={() => setNotification(null)}
            id="notification"
            time={new Date().toLocaleTimeString()}
          />
        ))}

      {/* Current Plan Usage */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Current Plan"
          value={currentPlan.name}
          trend={{
            value: currentPlan.price,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="API Calls Used"
          value="45,000"
          trend={{
            value: currentPlan.apiCalls,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Storage Used"
          value="6.3 GB"
          trend={{
            value: currentPlan.storage,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Active Users"
          value="8"
          trend={{
            value: currentPlan.users,
            isPositive: true,
          }}
        />
      </div>

      {/* Current Plan Details */}
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{currentPlan.name}</h2>
            <p className="text-gray-600 mt-1">Your current subscription plan</p>
            <ul className="mt-4 space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">${currentPlan.price}</p>
            <p className="text-gray-600">per month</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setShowPaymentDialog(true)}
            >
              Update Payment Method
            </Button>
          </div>
        </div>
      </Card>

      {/* Billing History */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Billing History</h2>
        <Table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.date}</td>
                <td>{invoice.description}</td>
                <td>${invoice.amount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log("Download invoice:", invoice.id)}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Upgrade Plan Dialog */}
      <ConfirmDialog
        isOpen={showUpgradeDialog}
        onCancel={() => setShowUpgradeDialog(false)}
        message="Are you sure you want to upgrade to the Enterprise Plan?"
        onConfirm={() => {
          setShowUpgradeDialog(false);
          setNotification({
            type: "success",
            message: "Plan upgraded successfully",
          });
        }}
        title="Upgrade Plan"
      />

      {/* Update Payment Dialog */}
      <ConfirmDialog
        isOpen={showPaymentDialog}
        onCancel={() => setShowPaymentDialog(false)}
        message="Are you sure you want to update your payment method?"
        onConfirm={() => {
          setShowPaymentDialog(false);
          setNotification({
            type: "success",
            message: "Payment method updated successfully",
          });
        }}
        title="Update Payment Method"
      />
    </div>
  );
}

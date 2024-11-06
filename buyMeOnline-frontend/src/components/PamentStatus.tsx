import React from "react";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"; // For icons

function PaymentStatus() {
  const isSuccess = status === "success";
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Optional redirect countdown
  React.useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => setRedirectCountdown(redirectCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [redirectCountdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        
        {isSuccess ? (
          <div>
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="text-gray-600 mt-2">
              Your transaction was completed successfully. Thank you for your purchase!
            </p>
          </div>
        ) : (
          <div>
            <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
            <p className="text-gray-600 mt-2">
              Unfortunately, we couldn’t process your payment. Please try again.
            </p>
          </div>
        )}

        <div className="mt-6">
          <button
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => (window.location.href = isSuccess ? "/dashboard" : "/retry-payment")}
          >
            {isSuccess ? "Go to Dashboard" : "Try Again"}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Redirecting in {redirectCountdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;

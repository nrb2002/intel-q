export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome to Intel-Q Queue Management System.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm text-slate-500">Waiting</h2>
          <p className="text-3xl font-bold text-amber-500">18</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm text-slate-500">In Service</h2>
          <p className="text-3xl font-bold text-blue-600">7</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm text-slate-500">Completed</h2>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm text-slate-500">Cancelled</h2>
          <p className="text-3xl font-bold text-red-600">2</p>
        </div>
      </div>

      {/* Recent Queue */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Recent Queue
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="py-2">Ticket</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Service</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">A001</td>
              <td>John Smith</td>
              <td>Account Opening</td>
              <td className="text-amber-500 font-medium">Waiting</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">A002</td>
              <td>Sarah Johnson</td>
              <td>Cash Deposit</td>
              <td className="text-blue-600 font-medium">In Service</td>
            </tr>

            <tr>
              <td className="py-3">A003</td>
              <td>Michael Brown</td>
              <td>Customer Support</td>
              <td className="text-green-600 font-medium">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
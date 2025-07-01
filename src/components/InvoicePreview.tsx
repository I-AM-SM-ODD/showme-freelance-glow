
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Send, Edit3, Printer } from 'lucide-react';
import { Invoice } from './InvoiceGenerator';

interface InvoicePreviewProps {
  invoice: Invoice;
  onEdit: () => void;
  onUpdateInvoice: (invoice: Invoice) => void;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  onEdit,
  onUpdateInvoice
}) => {
  const handleStatusChange = (newStatus: Invoice['status']) => {
    const updatedInvoice = { ...invoice, status: newStatus };
    onUpdateInvoice(updatedInvoice);
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading PDF for invoice:', invoice.invoiceNumber);
    alert('PDF download functionality would be implemented here');
  };

  const handleSendEmail = () => {
    // In a real app, this would send the invoice via email
    console.log('Sending invoice via email:', invoice.invoiceNumber);
    alert('Email sending functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'paid': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <Button onClick={onEdit} variant="outline" size="sm">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Invoice
        </Button>
        <Button onClick={handleDownloadPDF} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handleSendEmail} variant="outline" size="sm">
          <Send className="w-4 h-4 mr-2" />
          Send Email
        </Button>
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
        
        <div className="flex gap-2 ml-auto">
          <select
            value={invoice.status}
            onChange={(e) => handleStatusChange(e.target.value as Invoice['status'])}
            className="px-3 py-1 rounded-md border text-sm"
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoice Preview */}
      <Card className="glass print:shadow-none print:border-none">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand mb-2">
                {invoice.invoiceNumber}
              </div>
              <div className="text-sm text-gray-600">
                Issue Date: {new Date(invoice.issueDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">
                Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">From:</h3>
              <div className="text-gray-700">
                <div className="font-medium">Your Business Name</div>
                <div>Your Address</div>
                <div>City, State ZIP</div>
                <div>your.email@example.com</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
              <div className="text-gray-700">
                <div className="font-medium">{invoice.clientName}</div>
                <div className="whitespace-pre-line">{invoice.clientAddress}</div>
                <div>{invoice.clientEmail}</div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Qty</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Rate</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-right">${item.rate.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax ({invoice.taxRate}%):</span>
                  <span className="text-gray-900">${invoice.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-brand">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Terms & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Terms:</h4>
              <p className="text-sm text-gray-700">{invoice.paymentTerms}</p>
            </div>
            {invoice.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{invoice.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicePreview;

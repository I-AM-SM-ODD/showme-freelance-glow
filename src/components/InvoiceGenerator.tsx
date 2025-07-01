
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Send, Eye, Plus } from 'lucide-react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import InvoiceHistory from './InvoiceHistory';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes: string;
  paymentTerms: string;
}

const InvoiceGenerator = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'preview' | 'history'>('create');
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleInvoiceCreate = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setInvoices(prev => [...prev, invoice]);
    setActiveTab('preview');
  };

  const handleInvoiceUpdate = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setInvoices(prev => prev.map(inv => inv.id === invoice.id ? invoice : inv));
  };

  const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `INV-${timestamp}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Generator</h1>
          <p className="text-gray-600">Create, manage, and track your professional invoices</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg shadow-sm border">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'create'
                ? 'bg-brand text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Create Invoice
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            disabled={!currentInvoice}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-brand text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-brand text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Invoice History ({invoices.length})
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                </div>
                <FileText className="w-8 h-8 text-brand" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl font-bold">$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    {invoices.filter(inv => inv.status === 'paid').length}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Paid
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue').length}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  Pending
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="animate-fade-in-up">
          {activeTab === 'create' && (
            <InvoiceForm
              onInvoiceCreate={handleInvoiceCreate}
              generateInvoiceNumber={generateInvoiceNumber}
              existingInvoice={currentInvoice}
            />
          )}
          
          {activeTab === 'preview' && currentInvoice && (
            <InvoicePreview
              invoice={currentInvoice}
              onEdit={() => setActiveTab('create')}
              onUpdateInvoice={handleInvoiceUpdate}
            />
          )}
          
          {activeTab === 'history' && (
            <InvoiceHistory
              invoices={invoices}
              onSelectInvoice={(invoice) => {
                setCurrentInvoice(invoice);
                setActiveTab('preview');
              }}
              onDeleteInvoice={(invoiceId) => {
                setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
                if (currentInvoice?.id === invoiceId) {
                  setCurrentInvoice(null);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;

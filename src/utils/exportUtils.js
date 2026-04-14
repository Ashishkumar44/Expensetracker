export const exportToCSV = (expenses) => {
  if (expenses.length === 0) {
    alert('No expenses to export');
    return;
  }

  // CSV headers
  const headers = ['Date', 'Description', 'Category', 'Amount', 'Payment Method'];
  
  // Convert expenses to CSV rows
  const rows = expenses.map(exp => [
    exp.date,
    `"${exp.description}"`, // Quote to handle commas in description
    exp.category,
    exp.amount,
    exp.paymentMethod
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (expenses) => {
  if (expenses.length === 0) {
    alert('No expenses to export');
    return;
  }

  const jsonContent = JSON.stringify(expenses, null, 2);
  
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

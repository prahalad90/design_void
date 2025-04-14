import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import InvoiceForm from '../components/InvoiceForm'

const Invoice = ()=>{
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/invoice");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

const columns = [
    {
      name: "Customer",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
        name: "Invoice Number",
        selector: (row: any) => row.invoice_number,
        sortable: true,
      },

    {
      name: "Date",
      selector: (row: any) => {
        const date = new Date(row.date);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => parseFloat(row.price) * parseFloat(row.quantity),
    },
  ];


const customStyles = {
    rows: {
      style: {
        fontSize: '16px', // Adjust text size for table rows
      },
    },
    headCells: {
      style: {
        fontSize: '18px', // Adjust text size for table headers
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '16px', // Adjust text size for table cells
      },
    },
  };

    return (
        <>
      <div>
      <button className="bg-blue-100 px-5 py-2 rounded-[5px]" onClick={() => setShowForm(true)}>Raise Invoice</button>
      {showForm && <InvoiceForm setShowForm={setShowForm} />}
    </div>


        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          striped
          customStyles={customStyles}
        />
        </>
    )
}

export default Invoice;
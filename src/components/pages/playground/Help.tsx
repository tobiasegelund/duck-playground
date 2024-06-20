export default function Help() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <p className="mb-6">
        Welcome to Duck Playground! It's designed to make it easy for you to work with SQL queries without needing to install any software on your local machine. You can upload your data files and interact with them using SQL in a user-friendly web interface.
      </p>
      <p className="mb-6">
        This help section will guide you through the process of uploading files and using the Query Editor to run SQL queries directly in your web browser.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Uploading Files</h2>
      <p className="mb-4">To get started with analyzing your data, you'll first need to upload your files to the Duck Playground interface. Follow these steps:</p>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>Click on the <strong>upload</strong> tab located at the top of the page.</li>
        <li>Select the file you want to upload from your computer. Only a single file can be uploaded at a time (for now). DuckDB supports a variety of file formats, including CSV, Parquet, and JSON.</li>
        <li>Once the file are selected, click <strong>upload</strong> button. The uploaded file will appear in the file list below.</li>
      </ol>
      <p className="mb-6">After uploading, your files are ready to be queried using SQL in the Query Editor.</p>

      <h2 className="text-2xl font-semibold mb-4">Using the Query Editor</h2>
      <p className="mb-4">The Query Editor allows you to run SQL queries on your uploaded files. Here's how to use it:</p>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>In the Query Editor, located at the right of the page, type your SQL query. For example, you might start with a simple query like <code className="bg-gray-100 p-1 rounded">SELECT * FROM READ_PARQUET("test.parquet")</code>, where `test.parquet` is the name of your uploaded file.</li>
        <li>To execute the query, click the <strong>RUN</strong> button or press <code className="bg-gray-100 p-1 rounded">Ctrl + e</code> (Windows) / <code className="bg-gray-100 p-1 rounded">Cmd + e</code> (Mac).</li>
        <li>The results of your query will be displayed in the <strong>results</strong> tab.</li>
      </ol>
      <p className="mb-6">You can write and execute more complex SQL queries to analyze your data as needed. The Query Editor supports a wide range of SQL commands and functions available in DuckDB. You can read more about DuckDB's API <a href="https://duckdb.org/docs/sql/introduction" className="text-blue-500 underline" target='_blank'> here</a>.</p>

      {/* <h2 className="text-2xl font-semibold mb-4">Managing Your Data</h2>
      <p className="mb-4">In addition to querying your data, you can also manage it within the Duck Playground web interface:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>View File Details:</strong> Click on a file in the file list to view its schema.</li>
        <li><strong>Remove Files:</strong> To remove a file, click the trash icon next to the file name in the file list.</li>
        <li><strong>Download Results:</strong> After running a query, you can download the results by clicking the <strong>DOWNLOAD</strong> button in the Results pane.</li>
      </ul> */}

      <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
      <p className="mb-4">Here are some frequently asked questions that might help you get started:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>What file formats are supported?</strong> DuckDB supports CSV, Parquet, JSON, and more.</li>
        <li><strong>How do I edit a query?</strong> Simply click in the Query Editor and make your changes, then click <strong>RUN</strong> again.</li>
        <li><strong>Can I save my queries?</strong> Every executed query is automatically saved and can be accessed later in the <strong>history</strong> tab.</li>
      </ul>

      <p>We hope you find the Duck Playground easy to use and powerful for your data analysis needs!</p>
    </div>
  );
}

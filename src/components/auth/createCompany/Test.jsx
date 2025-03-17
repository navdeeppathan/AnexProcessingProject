import React, { useState } from "react";
import jsPDF from "jspdf";

const Test = () => {
  const [image, setImage] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Store base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>Upload an Image and Generate PDF</h1>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
      />

      {/* Display Uploaded Image */}
      {image && <img src={image} alt="Uploaded" width="100" height="100" />}

      {/* PDF Generator */}
      {image && <PDFG image={image} />}
    </div>
  );
};

export default Test;

const PDFG = ({ image }) => {
  const generatePdf = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.text(20, 20, "This is a PDF with an uploaded image");

    // Add image to PDF
    pdf.addImage(image, "PNG", 20, 50, 150, 150);
    pdf.save("image.pdf");
  };

  return <button onClick={generatePdf}>Generate PDF</button>;
};

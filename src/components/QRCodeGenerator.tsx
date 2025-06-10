
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCodeGenerator = ({ value, size = 200, className = '' }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple QR code generation using a library-free approach
  // In a real app, you'd use a library like 'qrcode' or 'qr-code-generator'
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create a simple placeholder QR code pattern
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, size, size);
        
        ctx.fillStyle = '#FFFFFF';
        const moduleSize = size / 21; // Standard QR code is 21x21 modules
        
        // Create a simple pattern that looks like a QR code
        for (let i = 0; i < 21; i++) {
          for (let j = 0; j < 21; j++) {
            if ((i + j) % 2 === 0 || (i % 3 === 0 && j % 3 === 0)) {
              ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
            }
          }
        }
        
        // Add finder patterns (corners)
        ctx.fillStyle = '#000000';
        // Top-left finder pattern
        ctx.fillRect(0, 0, moduleSize * 7, moduleSize * 7);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(moduleSize, moduleSize, moduleSize * 5, moduleSize * 5);
        ctx.fillStyle = '#000000';
        ctx.fillRect(moduleSize * 2, moduleSize * 2, moduleSize * 3, moduleSize * 3);
        
        // Add text below QR code
        ctx.fillStyle = '#000000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR Code', size / 2, size + 20);
      }
    }
  }, [value, size]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size + 30}
        className="border border-gray-300 rounded-lg"
      />
      <Button onClick={downloadQRCode} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Download QR Code
      </Button>
    </div>
  );
};

export default QRCodeGenerator;

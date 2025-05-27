
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Camera } from "lucide-react";

interface PhotoUploadProps {
  action: {
    id: string;
    title: string;
    points: number;
    description: string;
  };
  onSubmit: (actionId: string, imageFile: File) => void;
  onClose: () => void;
}

const PhotoUpload = ({ action, onSubmit, onClose }: PhotoUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onSubmit(action.id, selectedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                {action.title}
              </CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="photo">Upload Photo Proof</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>

          {imagePreview && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedImage}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Submit (+{action.points} pts)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoUpload;

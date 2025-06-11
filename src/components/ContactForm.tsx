import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon } from "lucide-react";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Kontakt oss
      </h3>

      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-3">
            <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-medium text-green-800 dark:text-green-400">
              Takk for din henvendelse!
            </p>
            <p className="text-sm text-green-700 dark:text-green-500">
              Vi har mottatt din melding og vil kontakte deg så snart som mulig.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 font-montserrat">
              <Label htmlFor="name">Navn</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ditt navn"
                required
                className="rounded-lg font-montserrat"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="din.e-post@eksempel.no"
                required
                className="rounded-lg font-montserrat"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon (optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+47 123 45 678"
              className="rounded-lg font-montserrat"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Melding</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Skriv din melding her..."
              required
              className="min-h-[120px] rounded-lg font-montserrat"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white border-0 font-montserrat font-semibold"
          >
            Send melding
          </Button>
        </form>
      )}
    </div>
  );
}

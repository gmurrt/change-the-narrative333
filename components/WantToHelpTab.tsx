'use client';

import { useState } from 'react';
import { useAdminSurveys } from '@/hooks/useAdminSurveys';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TabsContent } from "./ui/tabs";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { Heart, ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

const WantToHelpTab = () => {
  const { addSurvey } = useAdminSurveys();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: '',
    status: 'New',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.interest) return;
    setSubmitting(true);
    await addSurvey({
      ...form,
      role: 'supporter',
      date: Timestamp.now(),
    });
    setSubmitting(false);
    setOpen(false);
    setForm({ name: '', email: '', interest: '', status: 'New' });
  };

  return (
    <TabsContent value="want-to-help">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-accent" />
            Support Our Mission
          </CardTitle>
          <CardDescription>
            Volunteer your time or contribute financially to help us make a difference.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Volunteer Opportunities</h3>
              <p className="mb-4 text-sm">
                Share your skills and time to help those affected by gun violence and systemic inequality.
              </p>
              <Button variant="outline" className="flex items-center" onClick={() => setOpen(true)}>
                View Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Make a Donation</h3>
              <p className="mb-4 text-sm">
                Your financial support enables us to provide resources and services to those in need.
              </p>
              <Button className="flex items-center" asChild>
                <Link href="/donate">
                  Donate Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volunteer Interest</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className='mb-2'>Name</Label>
              <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div>
              <Label className='mb-2'>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
              <Label className='mb-2'>Area of Interest</Label>
              <Textarea
                rows={2}
                value={form.interest}
                onChange={(e) => handleChange('interest', e.target.value)}
              />
            </div>
            <div className="text-right">
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

export default WantToHelpTab;

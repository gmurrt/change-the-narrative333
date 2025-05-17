'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HelpCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { TabsContent } from '@/components/ui/tabs';
import { useAdminSurveys } from '@/hooks/useAdminSurveys';

const SeekingHelpTab = () => {
  const { addSurvey } = useAdminSurveys();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    needs: '',
    status: 'Pending',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.location || !form.needs) return;
    setSubmitting(true);
    await addSurvey({
      ...form,
      role: 'help-seeker',
      date: Timestamp.now(),
    });
    setSubmitting(false);
    setOpen(false);
    setForm({ name: '', email: '', location: '', needs: '', status: 'Pending' });
  };

  return (
    <TabsContent value="seeking-help">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-accent" />
            Find Support
          </CardTitle>
          <CardDescription>
            Complete our survey to help us understand your needs and connect you with appropriate resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/10 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Start Your Support Journey</h3>
            <p className="mb-4 text-sm">
              Our survey helps us understand your specific situation and needs so we can provide 
              the most relevant resources and support options.
            </p>
            <Button className="flex items-center" onClick={() => setOpen(true)}>
              Begin Survey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Note:</p>
              <p className="text-sm">
                If you're in an emergency situation, please call 911 or your local emergency services immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help Seeker Survey</DialogTitle>
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
              <Label className='mb-2'>Location</Label>
              <Input value={form.location} onChange={(e) => handleChange('location', e.target.value)} />
            </div>
            <div>
              <Label className='mb-2'>Your Primary Need</Label>
              <Textarea rows={2} value={form.needs} onChange={(e) => handleChange('needs', e.target.value)} />
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

export default SeekingHelpTab;

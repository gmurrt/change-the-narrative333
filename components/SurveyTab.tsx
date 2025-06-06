import { useAdminSurveys } from "@/hooks/useAdminSurveys";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Download, Loader2, Search, Trash2, Users } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { exportToCSV } from "@/lib/utils";
import { Timestamp } from "firebase/firestore";

// Define types for survey data
type SurveyData = {
  id: string;
  name: string;
  email: string;
  role: "help-seeker" | "supporter";
  status: string;
  date: Timestamp;
  location?: string;
  needs?: string;
  interest?: string;
  [key: string]: unknown; // For additional fields
};

type TableSectionProps = {
  data: SurveyData[];
  setSelectedSurvey: (survey: SurveyData | null) => void;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
};

type PaginationControlsProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
};

const formatDate = (ts: Timestamp | null | undefined): string =>
  ts?.toDate?.()
    ? ts.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const PAGE_SIZE = 5;

const SurveyTab = () => {
  const { surveys, deleteSurvey } = useAdminSurveys();
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyData | null>(null);
  const [activeTab, setActiveTab] = useState("help-seekers");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const helpSeekers = surveys.filter((s) => s.role === "help-seeker");
  const supporters = surveys.filter((s) => s.role === "supporter");

  const currentData = activeTab === "help-seekers" ? helpSeekers : supporters;

  const paginatedData = currentData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setSelectedIds([]);
    setCurrentPage(1);
  }, [activeTab, surveys]);

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    await Promise.all(selectedIds.map((id) => deleteSurvey(id)));
    setIsDeleting(false);
    setSelectedIds([]);
  };

  return (
    <TabsContent value="surveys">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" /> Survey Responses
              </CardTitle>
              <CardDescription>
                View and export survey data from help seekers and supporters
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleDeleteSelected}
                  className="gap-2"
                >
                  {isDeleting ? (
                    <div className="flex gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Selected ({selectedIds.length})
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() => {
                  const dataToExport =
                    activeTab === "help-seekers" ? helpSeekers : supporters;
                  const filename =
                    activeTab === "help-seekers"
                      ? "help_seekers.csv"
                      : "supporters.csv";
                  exportToCSV(dataToExport, filename);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                {activeTab === "help-seekers"
                  ? "Export Help Seekers"
                  : "Export Supporters"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="help-seekers"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="help-seekers">Help Seekers</TabsTrigger>
              <TabsTrigger value="supporters">Supporters</TabsTrigger>
            </TabsList>

            <TabsContent value="help-seekers">
              <FilterRow />
              <TableSection
                data={paginatedData}
                setSelectedSurvey={setSelectedSurvey}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
              <PaginationControls
                page={currentPage}
                setPage={setCurrentPage}
                totalItems={currentData.length}
              />
            </TabsContent>

            <TabsContent value="supporters">
              <TableSection
                data={paginatedData}
                setSelectedSurvey={setSelectedSurvey}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
              <PaginationControls
                page={currentPage}
                setPage={setCurrentPage}
                totalItems={currentData.length}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedSurvey}
        onOpenChange={() => setSelectedSurvey(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Survey Details</DialogTitle>
          </DialogHeader>
          {selectedSurvey && (
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedSurvey.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedSurvey.email}
              </p>
              {selectedSurvey.role === "help-seeker" ? (
                <>
                  <p>
                    <strong>Location:</strong> {selectedSurvey.location}
                  </p>
                  <p>
                    <strong>Primary Need:</strong> {selectedSurvey.needs}
                  </p>
                </>
              ) : (
                <p>
                  <strong>Interest:</strong> {selectedSurvey.interest}
                </p>
              )}
              <p>
                <strong>Status:</strong> {selectedSurvey.status}
              </p>
              <p>
                <strong>Role:</strong> {selectedSurvey.role}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedSurvey.date)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};

const FilterRow = () => (
  <div className="flex justify-between mb-4">
    <div className="flex items-center max-w-sm w-full">
      <Input placeholder="Search respondents..." className="rounded-r-none" />
      <Button className="rounded-l-none" variant="secondary">
        <Search className="h-4 w-4" />
      </Button>
    </div>
    <div className="flex items-center gap-2">
      <Label htmlFor="filter-date" className="text-sm whitespace-nowrap">
        Filter by:
      </Label>
      <select
        id="filter-date"
        className="h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
      >
        <option value="all">All Time</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </div>
  </div>
);

const TableSection = ({
  data,
  setSelectedSurvey,
  selectedIds,
  setSelectedIds,
}: TableSectionProps) => {
  const isSupporter = data?.[0]?.interest !== undefined;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {isSupporter ? (
              <TableHead>Interest</TableHead>
            ) : (
              <>
                <TableHead>Location</TableHead>
                <TableHead>Primary Need</TableHead>
              </>
            )}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((survey) => (
            <TableRow key={survey.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(survey.id)}
                  onCheckedChange={() => toggleSelect(survey.id)}
                />
              </TableCell>
              <TableCell>{formatDate(survey.date)}</TableCell>
              <TableCell>{survey.name}</TableCell>
              <TableCell>{survey.email}</TableCell>
              {isSupporter ? (
                <TableCell>{survey.interest?.slice(0, 20)}...</TableCell>
              ) : (
                <>
                  <TableCell>{survey.location}</TableCell>
                  <TableCell>{survey.needs?.slice(0, 20)}...</TableCell>
                </>
              )}
              <TableCell>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {survey.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSurvey(survey)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const PaginationControls = ({ page, setPage, totalItems }: PaginationControlsProps) => {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default SurveyTab;
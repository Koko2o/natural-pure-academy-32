
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Article } from "./types";
import { BookOpen, ArrowRight } from "lucide-react";

interface ReadingHistoryProps {
  articles: Article[];
}

const ReadingHistory = ({ articles }: ReadingHistoryProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>Historique de vos articles consultés</CardTitle>
        </div>
        <CardDescription>Retrouvez tous les articles que vous avez lus récemment</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date de lecture</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id} className="hover:bg-muted/5">
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="gap-1">
                      <Link to={`/article/${article.id}`}>
                        <span>Relire</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-8 text-center">
          <Button className="gap-2">
            <span>Voir mon historique complet</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingHistory;

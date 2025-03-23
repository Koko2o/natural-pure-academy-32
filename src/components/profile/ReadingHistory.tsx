
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Article } from "./types";

interface ReadingHistoryProps {
  articles: Article[];
}

const ReadingHistory = ({ articles }: ReadingHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique de vos articles consultés</CardTitle>
        <CardDescription>Retrouvez tous les articles que vous avez lus récemment</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Date de lecture</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/article/${article.id}`}>Relire</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReadingHistory;

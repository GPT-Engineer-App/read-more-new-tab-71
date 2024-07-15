import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const fetchTopStories = async () => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const storyIds = await response.json();
  return storyIds.slice(0, 100);
};

const fetchStory = async (id) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return response.json();
};

const StoryItem = ({ story }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow duration-300 bg-card text-card-foreground">
    <CardHeader className="bg-primary/10">
      <CardTitle className="text-lg text-primary-foreground">{story.title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <p className="text-sm text-muted-foreground mb-2">Upvotes: {story.score}</p>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline font-medium"
      >
        Read more
      </a>
    </CardContent>
  </Card>
);

const SkeletonStory = () => (
  <Card className="mb-4 bg-card">
    <CardHeader>
      <Skeleton className="h-6 w-[250px] bg-muted" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-[100px] mb-2 bg-muted" />
      <Skeleton className="h-4 w-[80px] bg-muted" />
    </CardContent>
  </Card>
);

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: storyIds, isLoading: isLoadingIds } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories
  });

  const { data: stories, isLoading: isLoadingStories } = useQuery({
    queryKey: ['stories', storyIds],
    queryFn: async () => {
      if (!storyIds) return [];
      return Promise.all(storyIds.map(fetchStory));
    },
    enabled: !!storyIds
  });

  const filteredStories = stories?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Swedish Hacker News Top Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 shadow-sm bg-input text-input-foreground"
      />
      {isLoadingIds || isLoadingStories ? (
        Array(10).fill().map((_, index) => <SkeletonStory key={index} />)
      ) : (
        filteredStories?.map(story => (
          <StoryItem key={story.id} story={story} />
        ))
      )}
    </div>
  );
};

export default Index;
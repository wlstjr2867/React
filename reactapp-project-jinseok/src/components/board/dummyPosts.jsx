const dummyPosts = [
    ...Array.from({length:10},(_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      author: `user${(i % 3) + 1}`,
      createdAt: new Date().toISOString(),
    })),
  ];

export default dummyPosts;
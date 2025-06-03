// Update the title
<div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Rankings</h1>
  <p className="text-gray-600">See how your family ranks in Zafeco</p>
</div>

// Update fetchLeaderboardData to include real-time sync
const fetchLeaderboardData = async () => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, family_name, points, league, member_count')
      .order('points', { ascending: false });

    if (error) throw error;

    // Add rank to each family
    const rankedFamilies = profiles.map((family, index) => ({
      ...family,
      rank: index + 1
    }));

    setFamilies(rankedFamilies);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
  } finally {
    setLoading(false);
  }
};

// Add real-time subscription
useEffect(() => {
  fetchLeaderboardData();

  const subscription = supabase
    .channel('profiles')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'profiles' 
    }, () => {
      fetchLeaderboardData();
    })
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);

export default fetchLeaderboardData
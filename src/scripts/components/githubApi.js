// Live GitHub API integration for Programpassion
export async function initGitHubTelemetry() {
  const username = 'Programpassion';
  const repoBadge = document.getElementById('stat-repos');
  const followersBadge = document.getElementById('stat-followers');
  const syncStatus = document.getElementById('hud-github-status');

  // Static fallback data based on verified repositories
  const fallbackData = {
    public_repos: 4,
    followers: 2,
    repos: [
      {
        name: 'deepfake-detection-research',
        language: 'Python',
        description: 'Simulation project on deepfake detection research & neural verification',
        html_url: 'https://github.com/Programpassion/deepfake-detection-research',
        stargazers_count: 0
      },
      {
        name: 'EldenRing',
        language: 'JavaScript',
        description: 'Elden Ring Aesthetics showcasing website & rich atmospheric visual canvas',
        html_url: 'https://github.com/Programpassion/EldenRing',
        stargazers_count: 0
      },
      {
        name: 'utsah2026',
        language: 'Python',
        description: 'Utsah Fest technical platform & event architecture',
        html_url: 'https://github.com/Programpassion/utsah2026',
        stargazers_count: 0
      },
      {
        name: 'utsahfest',
        language: 'Web',
        description: 'Interactive portal & Gita Fest community engine',
        html_url: 'https://github.com/Programpassion/utsahfest',
        stargazers_count: 0
      }
    ]
  };

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('GitHub API rate limited or unreachable');

    const userData = await userRes.json();
    
    if (repoBadge) repoBadge.textContent = userData.public_repos ?? fallbackData.public_repos;
    if (followersBadge) followersBadge.textContent = userData.followers ?? fallbackData.followers;
    if (syncStatus) {
      syncStatus.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>LIVE TELEMETRY: SYNCED`;
      syncStatus.classList.remove('text-slate-500');
      syncStatus.classList.add('text-emerald-400');
    }
  } catch (err) {
    // Graceful fallback to pre-baked real stats
    if (repoBadge) repoBadge.textContent = fallbackData.public_repos;
    if (followersBadge) followersBadge.textContent = fallbackData.followers;
    if (syncStatus) {
      syncStatus.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-cyber-cyan mr-1.5"></span>TELEMETRY: VERIFIED CACHE`;
      syncStatus.classList.add('text-cyber-cyan');
    }
  }
}

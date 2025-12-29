// Blog content types and GitHub-driven loading utilities

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  author: string;
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  summary: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  author: string;
}

// Mock data - In production, this would fetch from GitHub raw files
// Each entry represents a markdown file in your GitHub repository
const blogPosts: BlogPost[] = [
  {
    slug: "building-low-latency-trading-infrastructure",
    title: "Building Low-Latency Trading Infrastructure at Scale",
    summary: "Deep dive into how we architected Nubra's order matching engine to achieve sub-millisecond latency while maintaining consistency guarantees.",
    tags: ["Infrastructure", "Performance", "Systems"],
    readTime: "12 min",
    publishDate: "2024-12-15",
    author: "Engineering Team",
    content: `
# Building Low-Latency Trading Infrastructure at Scale

At Nubra, latency isn't just a metric—it's the foundation of everything we build. When you're executing trades across global markets, every microsecond matters.

## The Challenge

Modern trading infrastructure needs to handle:

- **Millions of orders per second** with deterministic latency
- **Sub-millisecond matching** across order books
- **Real-time risk calculations** without blocking the critical path
- **Geographic distribution** while maintaining consistency

## Our Approach

### Lock-Free Data Structures

Traditional mutex-based synchronization creates contention under load. We implemented lock-free order books using atomic compare-and-swap operations:

\`\`\`rust
pub struct OrderBook {
    bids: AtomicPtr<PriceLevel>,
    asks: AtomicPtr<PriceLevel>,
    sequence: AtomicU64,
}

impl OrderBook {
    pub fn insert_order(&self, order: Order) -> Result<(), OrderError> {
        loop {
            let current = self.bids.load(Ordering::Acquire);
            let new_level = self.compute_new_level(current, &order);
            
            if self.bids.compare_exchange(
                current,
                new_level,
                Ordering::Release,
                Ordering::Relaxed
            ).is_ok() {
                return Ok(());
            }
        }
    }
}
\`\`\`

### Memory-Mapped Persistence

For recovery without sacrificing performance, we use memory-mapped files with careful fsync semantics:

\`\`\`rust
pub struct PersistentLog {
    mmap: MmapMut,
    write_offset: AtomicUsize,
}

impl PersistentLog {
    pub fn append(&self, entry: &[u8]) -> io::Result<u64> {
        let offset = self.write_offset.fetch_add(
            entry.len(),
            Ordering::SeqCst
        );
        
        unsafe {
            self.mmap[offset..offset + entry.len()]
                .copy_from_slice(entry);
        }
        
        Ok(offset as u64)
    }
}
\`\`\`

## Results

After 18 months of optimization:

| Metric | Before | After |
|--------|--------|-------|
| P50 Latency | 2.3ms | 0.12ms |
| P99 Latency | 15ms | 0.8ms |
| Throughput | 50K/s | 2.1M/s |

## What's Next

We're currently working on:

1. **FPGA acceleration** for the matching engine hot path
2. **Kernel bypass networking** using DPDK
3. **Custom memory allocators** optimized for our access patterns

The pursuit of latency never ends.

---

*Want to build infrastructure like this? We're hiring. Check out our [careers page](/careers).*
    `
  },
  {
    slug: "websocket-api-design-patterns",
    title: "WebSocket API Design Patterns for Real-Time Market Data",
    summary: "Lessons learned from building Nubra's real-time market data streaming API, handling millions of concurrent connections.",
    tags: ["API Design", "WebSockets", "Streaming"],
    readTime: "9 min",
    publishDate: "2024-12-08",
    author: "Platform Team",
    content: `
# WebSocket API Design Patterns for Real-Time Market Data

When we set out to build Nubra's market data API, we knew HTTP polling wouldn't cut it. Traders need data in real-time, not "eventually."

## Connection Management

### Heartbeats and Keepalives

WebSocket connections are fragile. Proxies, load balancers, and NAT tables all conspire to kill idle connections.

\`\`\`typescript
interface HeartbeatConfig {
  interval: number;      // How often to send pings
  timeout: number;       // How long to wait for pong
  maxMissed: number;     // Max missed before disconnect
}

class ConnectionManager {
  private missedHeartbeats = 0;
  
  startHeartbeat(ws: WebSocket, config: HeartbeatConfig) {
    setInterval(() => {
      if (this.missedHeartbeats >= config.maxMissed) {
        ws.close(4000, 'Heartbeat timeout');
        return;
      }
      
      ws.ping();
      this.missedHeartbeats++;
    }, config.interval);
    
    ws.on('pong', () => {
      this.missedHeartbeats = 0;
    });
  }
}
\`\`\`

### Subscription Management

Clients subscribe to specific data streams. We use a topic-based model:

\`\`\`json
{
  "type": "subscribe",
  "channels": [
    { "name": "ticker", "symbols": ["BTC-USD", "ETH-USD"] },
    { "name": "orderbook", "symbols": ["BTC-USD"], "depth": 10 }
  ]
}
\`\`\`

## Backpressure Handling

When clients can't keep up with the data rate, you have two choices: drop messages or disconnect them. We chose a hybrid approach.

\`\`\`typescript
class BackpressureHandler {
  private buffer: Message[] = [];
  private readonly maxBuffer = 1000;
  
  send(ws: WebSocket, message: Message) {
    if (ws.bufferedAmount > this.maxBuffer) {
      // Client is slow, switch to snapshot mode
      this.buffer.push(message);
      
      if (this.buffer.length > 100) {
        // Too far behind, send snapshot instead
        this.sendSnapshot(ws);
        this.buffer = [];
      }
    } else {
      ws.send(JSON.stringify(message));
    }
  }
}
\`\`\`

## Message Format Evolution

We learned the hard way that you need versioning from day one:

\`\`\`typescript
interface MarketDataMessage {
  version: 2;
  type: 'ticker' | 'orderbook' | 'trade';
  timestamp: number;      // Microseconds since epoch
  sequence: number;       // For gap detection
  data: TickerData | OrderBookData | TradeData;
}
\`\`\`

## Monitoring

The metrics that matter:

- **Connection count** by client type
- **Message rate** per channel
- **Latency percentiles** from exchange to client
- **Subscription fanout** ratio

---

*Our WebSocket API handles 50M+ messages per second. Read the [API docs](/docs) to get started.*
    `
  },
  {
    slug: "zero-downtime-deployments",
    title: "Zero-Downtime Deployments for Trading Systems",
    summary: "How we deploy updates to production trading infrastructure without dropping a single order or missing a trade.",
    tags: ["DevOps", "Reliability", "Kubernetes"],
    readTime: "8 min",
    publishDate: "2024-11-28",
    author: "SRE Team",
    content: `
# Zero-Downtime Deployments for Trading Systems

In trading, downtime means lost money. Not just for us, but for every trader relying on our infrastructure. Here's how we ship code without fear.

## The Problem

Traditional blue-green deployments don't work for stateful trading systems:

- **Order state** must persist across deployments
- **WebSocket connections** can't just be dropped
- **Position calculations** must remain consistent
- **Regulatory requirements** mandate audit trails

## Our Solution: Graceful Handoff

### Step 1: Prepare the New Version

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: matching-engine-v2
spec:
  replicas: 0  # Start with zero
  template:
    spec:
      containers:
      - name: engine
        readinessProbe:
          exec:
            command: ["/bin/check-state-sync"]
          initialDelaySeconds: 30
\`\`\`

### Step 2: State Synchronization

Before accepting traffic, the new version syncs state:

\`\`\`go
func (e *Engine) SyncState(source string) error {
    stream, err := e.client.StreamState(source)
    if err != nil {
        return err
    }
    
    for state := range stream {
        if err := e.applyState(state); err != nil {
            return err
        }
        
        if state.Sequence >= e.targetSequence {
            break
        }
    }
    
    return nil
}
\`\`\`

### Step 3: Connection Draining

We give clients time to reconnect gracefully:

\`\`\`go
func (s *Server) GracefulShutdown() {
    // Stop accepting new connections
    s.listener.Close()
    
    // Notify connected clients
    for _, conn := range s.connections {
        conn.Send(Message{
            Type: "system",
            Data: map[string]interface{}{
                "event": "reconnect_required",
                "delay": 5000,
                "endpoints": s.healthyEndpoints(),
            },
        })
    }
    
    // Wait for connections to drain
    deadline := time.Now().Add(30 * time.Second)
    for len(s.connections) > 0 && time.Now().Before(deadline) {
        time.Sleep(100 * time.Millisecond)
    }
}
\`\`\`

## Rollback Strategy

Every deployment is a potential rollback:

\`\`\`bash
#!/bin/bash
# Automated rollback if error rate exceeds threshold

ERROR_RATE=$(curl -s "$METRICS_URL/error_rate")

if (( $(echo "$ERROR_RATE > 0.01" | bc -l) )); then
    echo "Error rate $ERROR_RATE exceeds threshold, rolling back"
    kubectl rollout undo deployment/matching-engine
    exit 1
fi
\`\`\`

## Results

Since implementing this system:

- **0 dropped orders** during deployments
- **<100ms** of increased latency during handoff
- **4x more frequent** deployments

---

*Reliability is a feature. Learn more about our [infrastructure](/docs/infrastructure).*
    `
  },
  {
    slug: "rust-for-trading-systems",
    title: "Why We Chose Rust for Our Trading Engine",
    summary: "A technical deep-dive into our decision to rebuild Nubra's core matching engine in Rust, and what we learned along the way.",
    tags: ["Rust", "Performance", "Engineering"],
    readTime: "15 min",
    publishDate: "2024-11-15",
    author: "Core Team",
    content: `
# Why We Chose Rust for Our Trading Engine

When we started Nubra, our matching engine was written in Go. It worked. But as we scaled, we hit walls that no amount of optimization could break through.

## The Inflection Point

At 100K orders per second, our Go implementation showed its limits:

\`\`\`
Benchmark results (Go implementation):
  P50:  1.2ms
  P99:  8.4ms
  P999: 45ms  <- GC pauses
\`\`\`

Those P999 spikes? Garbage collection. In trading, a 45ms pause can mean the difference between profit and loss.

## Why Rust?

### Zero-Cost Abstractions

Rust lets you write high-level code that compiles to efficient machine code:

\`\`\`rust
// High-level, safe, and zero-cost
pub fn match_orders(
    bids: &mut BinaryHeap<Bid>,
    asks: &mut BinaryHeap<Ask>,
) -> Vec<Trade> {
    let mut trades = Vec::new();
    
    while let (Some(bid), Some(ask)) = (bids.peek(), asks.peek()) {
        if bid.price < ask.price {
            break;
        }
        
        let trade = execute_trade(
            bids.pop().unwrap(),
            asks.pop().unwrap(),
        );
        trades.push(trade);
    }
    
    trades
}
\`\`\`

### No Garbage Collection

Memory is managed at compile time:

\`\`\`rust
// This is allocated on the stack, no heap allocation
struct Order {
    id: u64,
    price: Decimal,
    quantity: Decimal,
    side: Side,
    timestamp: u64,
}

// Arena allocator for order book levels
pub struct OrderBookArena {
    levels: Vec<PriceLevel>,
    free_list: Vec<usize>,
}
\`\`\`

### Fearless Concurrency

The borrow checker prevents data races at compile time:

\`\`\`rust
use std::sync::Arc;
use parking_lot::RwLock;

pub struct SharedOrderBook {
    inner: Arc<RwLock<OrderBook>>,
}

impl SharedOrderBook {
    pub fn read<F, R>(&self, f: F) -> R
    where
        F: FnOnce(&OrderBook) -> R,
    {
        let guard = self.inner.read();
        f(&guard)
    }
    
    pub fn write<F, R>(&self, f: F) -> R
    where
        F: FnOnce(&mut OrderBook) -> R,
    {
        let mut guard = self.inner.write();
        f(&mut guard)
    }
}
\`\`\`

## The Rewrite Journey

### Phase 1: Parallel Implementation

We ran both systems side-by-side, comparing outputs:

\`\`\`rust
#[cfg(feature = "shadow_mode")]
pub fn process_order(&self, order: Order) -> ProcessResult {
    let rust_result = self.rust_engine.process(order.clone());
    let go_result = self.go_engine.process(order);
    
    if rust_result != go_result {
        metrics::increment("shadow_mode.mismatch");
        tracing::error!(
            ?rust_result,
            ?go_result,
            "Engine mismatch detected"
        );
    }
    
    go_result // Use Go result until validated
}
\`\`\`

### Phase 2: Gradual Traffic Shift

\`\`\`rust
pub fn route_order(&self, order: Order) -> ProcessResult {
    let percentage = self.config.rust_traffic_percentage();
    
    if self.should_route_to_rust(order.id, percentage) {
        self.rust_engine.process(order)
    } else {
        self.go_engine.process(order)
    }
}
\`\`\`

## Results

After the migration:

| Metric | Go | Rust | Improvement |
|--------|-----|------|-------------|
| P50 | 1.2ms | 0.08ms | 15x |
| P99 | 8.4ms | 0.4ms | 21x |
| P999 | 45ms | 0.9ms | 50x |
| Memory | 8GB | 2GB | 4x |

## Lessons Learned

1. **Start with the hot path** - Don't rewrite everything at once
2. **Shadow mode is essential** - Validate before you migrate
3. **Invest in tooling** - Rust's ecosystem requires more upfront setup
4. **Train the team** - Rust has a learning curve

---

*Interested in Rust at scale? We're [hiring systems engineers](/careers).*
    `
  },
  {
    slug: "api-rate-limiting-strategies",
    title: "API Rate Limiting Strategies for Trading APIs",
    summary: "Implementing fair, predictable rate limiting that protects infrastructure without penalizing legitimate high-frequency traders.",
    tags: ["API Design", "Rate Limiting", "Security"],
    readTime: "7 min",
    publishDate: "2024-11-01",
    author: "API Team",
    content: `
# API Rate Limiting Strategies for Trading APIs

Rate limiting is a balance: protect your infrastructure without punishing your best customers. For trading APIs, this balance is especially critical.

## The Challenge

Trading APIs have unique requirements:

- **Burst tolerance**: Traders need to react quickly to market events
- **Fairness**: High-volume traders shouldn't crowd out others
- **Predictability**: Traders need to know their limits in advance
- **Granularity**: Different endpoints have different costs

## Token Bucket with Burst

Our primary algorithm: token bucket with configurable burst:

\`\`\`typescript
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  
  constructor(
    private readonly capacity: number,
    private readonly refillRate: number,
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  tryConsume(count: number = 1): boolean {
    this.refill();
    
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    
    return false;
  }
  
  private refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const newTokens = (elapsed / 1000) * this.refillRate;
    
    this.tokens = Math.min(this.capacity, this.tokens + newTokens);
    this.lastRefill = now;
  }
}
\`\`\`

## Endpoint Weighting

Not all requests are equal. A simple quote costs less than a complex order:

\`\`\`typescript
const ENDPOINT_WEIGHTS: Record<string, number> = {
  'GET /quotes': 1,
  'GET /orderbook': 2,
  'POST /orders': 5,
  'POST /orders/bulk': 20,
  'GET /history': 10,
};

function getRateLimit(endpoint: string): number {
  return ENDPOINT_WEIGHTS[endpoint] ?? 1;
}
\`\`\`

## Response Headers

Transparency is key. Every response includes rate limit info:

\`\`\`http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1699900000
X-RateLimit-Cost: 5
\`\`\`

## Graceful Degradation

When limits are exceeded, we don't just reject—we help:

\`\`\`typescript
function handleRateLimit(req: Request, bucket: TokenBucket): Response {
  if (bucket.tryConsume(getWeight(req))) {
    return processRequest(req);
  }
  
  const retryAfter = bucket.getRetryAfter();
  
  return new Response(JSON.stringify({
    error: 'rate_limit_exceeded',
    message: 'Too many requests',
    retry_after: retryAfter,
    docs: 'https://docs.nubra.io/rate-limits',
  }), {
    status: 429,
    headers: {
      'Retry-After': String(retryAfter),
      'X-RateLimit-Reset': String(Date.now() + retryAfter * 1000),
    },
  });
}
\`\`\`

## Tiered Limits

Different tiers for different needs:

| Tier | Requests/min | Burst | Use Case |
|------|--------------|-------|----------|
| Free | 60 | 10 | Testing |
| Pro | 600 | 100 | Active trading |
| Enterprise | 6000 | 1000 | Institutional |

---

*Need higher limits? [Contact us](/enterprise) about enterprise plans.*
    `
  }
];

/**
 * Fetch all blog posts
 * In production, this would fetch from GitHub API
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return blogPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Fetch a single blog post by slug
 * In production, this would fetch from GitHub raw content
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return blogPosts.find(post => post.slug === slug) || null;
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

## ECANA | Ethiopian Commodity Price Tracking and Analytics

Scrapes data from ecx website using cheerio (and the axios cookie jar because they have some wierdness going on there with that), saves it to mongodb, and renders it on a React/Next.js frontend.

Initial implementation for this site was created using data from the nbe markets site (because ECX site wasn't stable back then) and as such was sort of limited. This gets data directly from there and as such has much more detail. Currently focused on Coffee only while I get it stable. But even then there's dozens of coffee contracts. 

Storage wise going for storing time series data and transforming it on demand as needed.


## Roadmap

- [x] Basic Price Tracking
- [x] Commodity Overview Page
- [ ] Specific Contract Details Page
- [ ] Visualization

## Contributing

### Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up MongoDB and configure connection strings. You'll need a mongo connection string (MONGO_DB_URI) inside your .env to connect to a database. 

### Running the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

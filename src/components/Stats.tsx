"use client";

import { TrendingUp } from "lucide-react";

export const stats = [
  { id: 1, name: "Years of Experience", value: "25+" },
  { id: 2, name: "Global Clients", value: "1000+" },
  { id: 3, name: "Team Members", value: "150+" },
  { id: 4, name: "Projects Completed", value: "500+" },
];

export function Stats() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
            <span className="font-semibold">Our Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Numbers That Matter</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
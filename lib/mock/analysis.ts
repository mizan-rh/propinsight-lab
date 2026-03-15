import type { RegionAnalysis } from "@/lib/types";

export const mockAnalysis: Record<string, RegionAnalysis> = {
    manchester: {
        slug: "manchester",
        factors: {
            employmentRate: 88,
            incomeLevel: 72,
            populationGrowth: 85,
            rentalYield: 79,
            priceGrowth: 81,
            industryDiversity: 83,
            demandStrength: 90,
            affordability: 62,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 142000, rentalYield: 6.1 },
            { year: 2015, avgPrice: 148500, rentalYield: 5.9 },
            { year: 2016, avgPrice: 156200, rentalYield: 5.8 },
            { year: 2017, avgPrice: 165800, rentalYield: 5.7 },
            { year: 2018, avgPrice: 173400, rentalYield: 5.6 },
            { year: 2019, avgPrice: 179000, rentalYield: 5.5 },
            { year: 2020, avgPrice: 182500, rentalYield: 5.6 },
            { year: 2021, avgPrice: 198000, rentalYield: 5.4 },
            { year: 2022, avgPrice: 218500, rentalYield: 5.2 },
            { year: 2023, avgPrice: 231000, rentalYield: 5.3 },
            { year: 2024, avgPrice: 245000, rentalYield: 5.4 },
        ],
        explanation: {
            summary:
                "Manchester scores strongly across most investment fundamentals. The city benefits from sustained population growth driven by its expanding tech and media sectors, particularly around MediaCityUK and the Northern Quarter. Rental demand remains robust, supported by a large student population and young professionals.",
            strengths: [
                "Exceptional demand strength driven by a growing young professional and student population",
                "High industry diversity across tech, media, finance, and manufacturing sectors",
                "Consistent price growth outpacing the national average over the past decade",
            ],
            concerns: [
                "Affordability is declining as prices outpace local wage growth",
                "Some micro-locations show signs of oversupply in new-build apartment stock",
                "Rental yield compression as capital values rise faster than rents",
            ],
            tradeoffs:
                "Manchester offers strong capital growth prospects and reliable demand, but investors should be aware that the rapid price appreciation is beginning to erode affordability and compress yields. The trade-off is essentially between continued capital upside and diminishing income returns.",
            assumptions: [
                "Factor scores are derived from ONS annual population surveys and HMRC PAYE data for the 2023–24 fiscal year",
                "Rental yield calculations assume a standard single-let residential property without HMO conversion",
                "Price growth projections are based on a 5-year compound annual growth rate from Land Registry data",
                "Industry diversity is measured using the Herfindahl-Hirschman Index applied to SIC code employment data",
            ],
            limitations: [
                "This analysis does not account for micro-location variations within the region — outcomes in Salford Quays may differ substantially from Moss Side",
                "Future infrastructure projects such as HS2 Phase 2 are not factored into current scores",
                "The model cannot predict policy changes such as Section 24 modifications or stamp duty reforms",
                "Student housing and purpose-built rental sectors are excluded from yield calculations",
            ],
        },
        warnings: [],
    },

    birmingham: {
        slug: "birmingham",
        factors: {
            employmentRate: 74,
            incomeLevel: 65,
            populationGrowth: 78,
            rentalYield: 72,
            priceGrowth: 76,
            industryDiversity: 71,
            demandStrength: 77,
            affordability: 68,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 128000, rentalYield: 5.8 },
            { year: 2015, avgPrice: 133500, rentalYield: 5.7 },
            { year: 2016, avgPrice: 139800, rentalYield: 5.6 },
            { year: 2017, avgPrice: 147200, rentalYield: 5.5 },
            { year: 2018, avgPrice: 154600, rentalYield: 5.4 },
            { year: 2019, avgPrice: 160200, rentalYield: 5.3 },
            { year: 2020, avgPrice: 162800, rentalYield: 5.4 },
            { year: 2021, avgPrice: 176500, rentalYield: 5.2 },
            { year: 2022, avgPrice: 192000, rentalYield: 5.0 },
            { year: 2023, avgPrice: 201500, rentalYield: 5.1 },
            { year: 2024, avgPrice: 212000, rentalYield: 5.2 },
        ],
        explanation: {
            summary:
                "Birmingham presents a balanced investment profile with moderate scores across all factors. The city has benefited from HS2 anticipation and the Commonwealth Games legacy, but employment rates lag behind other major cities. Growth potential remains solid, particularly in the Jewellery Quarter and Digbeth regeneration areas.",
            strengths: [
                "Strong population growth fuelled by one of the youngest demographics in Europe",
                "Significant regeneration investment through the Big City Plan and Smithfield development",
                "Good transport connectivity improvements with Midland Metro extensions",
            ],
            concerns: [
                "Employment rate below the national average, particularly in outer boroughs",
                "Income levels remain comparatively low, putting a ceiling on rent increases",
                "HS2 delays have created uncertainty around some investment corridors",
            ],
            tradeoffs:
                "Birmingham offers more affordable entry points than Manchester or Bristol, with genuine regeneration-driven upside. However, the lower income base means rental growth may underperform and there is greater reliance on large infrastructure projects delivering on time.",
            assumptions: [
                "Employment data sourced from the Annual Population Survey covering the West Midlands Combined Authority area",
                "Regeneration impact zones are defined using the Birmingham Development Plan boundaries",
                "Price history reflects the Birmingham local authority area excluding Solihull",
                "Population growth projections incorporate ONS mid-year estimates and internal migration patterns",
            ],
            limitations: [
                "The impact of HS2 is not modelled due to ongoing timeline uncertainty",
                "Commercial-to-residential permitted development conversions are excluded from supply calculations",
                "Analysis covers the Birmingham local authority boundary and does not extend to the wider conurbation",
                "Social housing stock changes and right-to-buy activity are not factored in",
            ],
        },
        warnings: [
            {
                type: "industry_dependency",
                severity: "medium",
                title: "Public Sector Employment Concentration",
                narrative:
                    "Birmingham has a notably high proportion of employment in the public sector, accounting for approximately 28% of all jobs compared to the national average of 21%. This concentration creates vulnerability to government spending reviews and austerity measures that could suppress local economic activity and housing demand.",
                historicalContext:
                    "During the 2010–2015 austerity period, Birmingham experienced a net loss of 12,000 public sector jobs, which contributed to a 3.2% decline in house prices between 2011 and 2013 while other major cities saw modest growth.",
            },
        ],
    },

    leeds: {
        slug: "leeds",
        factors: {
            employmentRate: 76,
            incomeLevel: 63,
            populationGrowth: 68,
            rentalYield: 74,
            priceGrowth: 72,
            industryDiversity: 77,
            demandStrength: 70,
            affordability: 71,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 132000, rentalYield: 5.5 },
            { year: 2015, avgPrice: 136800, rentalYield: 5.4 },
            { year: 2016, avgPrice: 142500, rentalYield: 5.3 },
            { year: 2017, avgPrice: 149200, rentalYield: 5.3 },
            { year: 2018, avgPrice: 155800, rentalYield: 5.2 },
            { year: 2019, avgPrice: 161400, rentalYield: 5.1 },
            { year: 2020, avgPrice: 163200, rentalYield: 5.2 },
            { year: 2021, avgPrice: 175000, rentalYield: 5.0 },
            { year: 2022, avgPrice: 188500, rentalYield: 4.9 },
            { year: 2023, avgPrice: 196200, rentalYield: 5.0 },
            { year: 2024, avgPrice: 205000, rentalYield: 5.1 },
        ],
        explanation: {
            summary:
                "Leeds offers a solid mid-range investment profile with particular strength in financial services employment and industry diversity. The city centre has seen considerable regeneration, though population growth has been more modest than Manchester or Birmingham. The legal and financial sectors provide a stable economic backbone.",
            strengths: [
                "Strong financial and legal services sector providing stable, high-value employment",
                "Good industry diversity reducing exposure to single-sector downturns",
                "Improving rental yields in city centre locations following recent market corrections",
            ],
            concerns: [
                "Population growth has slowed compared to other Northern cities",
                "Income levels remain below the national median despite a concentration of professional services",
                "Outer suburbs show limited price appreciation compared to city centre postcodes",
            ],
            tradeoffs:
                "Leeds provides a stable, lower-volatility investment compared to faster-growing cities. Yields are competitive and the employment base is well diversified, but growth upside is moderate rather than exceptional. Best suited to income-focused rather than capital-growth strategies.",
            assumptions: [
                "Financial services employment data covers the Leeds City Region LEP area",
                "Rental yield figures are based on Zoopla rental index data cross-referenced with Land Registry sale prices",
                "Industry diversity scores incorporate BRES data at two-digit SIC code level",
                "Demand projections use DCLG household formation estimates for West Yorkshire",
            ],
            limitations: [
                "This analysis does not distinguish between city centre apartment markets and suburban family housing",
                "Student accommodation in the Headingley and Hyde Park corridors is measured separately from the wider market",
                "The impact of Channel 4's relocation to Leeds is difficult to isolate from broader trends",
                "Council tax band distribution may not accurately reflect current market values in all areas",
            ],
        },
        warnings: [],
    },

    bristol: {
        slug: "bristol",
        factors: {
            employmentRate: 84,
            incomeLevel: 78,
            populationGrowth: 74,
            rentalYield: 58,
            priceGrowth: 82,
            industryDiversity: 80,
            demandStrength: 85,
            affordability: 45,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 185000, rentalYield: 4.8 },
            { year: 2015, avgPrice: 198500, rentalYield: 4.6 },
            { year: 2016, avgPrice: 215200, rentalYield: 4.4 },
            { year: 2017, avgPrice: 228800, rentalYield: 4.3 },
            { year: 2018, avgPrice: 241400, rentalYield: 4.2 },
            { year: 2019, avgPrice: 252000, rentalYield: 4.1 },
            { year: 2020, avgPrice: 258500, rentalYield: 4.0 },
            { year: 2021, avgPrice: 285000, rentalYield: 3.8 },
            { year: 2022, avgPrice: 312000, rentalYield: 3.7 },
            { year: 2023, avgPrice: 328500, rentalYield: 3.8 },
            { year: 2024, avgPrice: 342000, rentalYield: 3.9 },
        ],
        explanation: {
            summary:
                "Bristol is a high-performing market driven by exceptional employment fundamentals and strong demand from a well-educated, high-income population. However, affordability has become a significant constraint, with average prices now approaching 10x median earnings. This creates a tension between strong fundamentals and diminishing accessibility.",
            strengths: [
                "Robust employment rate with a thriving tech, aerospace, and creative sector base",
                "High income levels supporting premium rental values in central postcodes",
                "Consistent price growth underpinned by severe structural undersupply",
            ],
            concerns: [
                "Affordability ratio approaching London-level exclusivity, limiting buyer pool depth",
                "Rental yields are among the lowest of any major UK city outside London",
                "High entry costs create significant exposure to interest rate movements",
            ],
            tradeoffs:
                "Bristol is fundamentally a capital growth play. The strong economic base and constrained supply drive continued price appreciation, but the low yields mean investors are heavily reliant on capital gains. Cash flow will be tight or negative, making this unsuitable for income-dependent strategies.",
            assumptions: [
                "Employment data uses the Bristol, City of local authority boundary from NOMIS",
                "Affordability ratios are calculated using ONS house price to workplace earnings data",
                "Supply constraints are assessed using planning application data from Bristol City Council",
                "Tech sector employment is identified using SIC codes 62 and 63",
            ],
            limitations: [
                "Bristol's highly localised market means performance varies enormously between areas like Clifton and Hartcliffe",
                "The aerospace sector (Airbus, Rolls-Royce) creates both strength and concentration risk not fully captured in one score",
                "Student demand from UWE and University of Bristol is partially excluded from residential analysis",
                "Build-to-rent developments are growing rapidly but are excluded from traditional yield calculations",
            ],
        },
        warnings: [
            {
                type: "price_divergence",
                severity: "medium",
                title: "Price-to-Income Divergence Accelerating",
                narrative:
                    "Bristol house prices have grown 84.9% over the past decade while median workplace earnings have increased by only 28.3%. This widening gap suggests prices are increasingly decoupled from local fundamentals and supported by equity-rich relocating buyers and low supply rather than organic local demand growth.",
                historicalContext:
                    "Similar price-to-income divergence patterns were observed in Cambridge and Oxford during 2014–2018, which preceded periods of price stagnation when mortgage affordability tests were tightened. Bristol may face comparable headwinds if lending criteria become more restrictive.",
            },
        ],
    },

    newcastle: {
        slug: "newcastle",
        factors: {
            employmentRate: 62,
            incomeLevel: 55,
            populationGrowth: 48,
            rentalYield: 78,
            priceGrowth: 52,
            industryDiversity: 58,
            demandStrength: 60,
            affordability: 82,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 112000, rentalYield: 6.8 },
            { year: 2015, avgPrice: 114200, rentalYield: 6.7 },
            { year: 2016, avgPrice: 116800, rentalYield: 6.7 },
            { year: 2017, avgPrice: 120500, rentalYield: 6.6 },
            { year: 2018, avgPrice: 123900, rentalYield: 6.5 },
            { year: 2019, avgPrice: 126200, rentalYield: 6.5 },
            { year: 2020, avgPrice: 127800, rentalYield: 6.6 },
            { year: 2021, avgPrice: 135000, rentalYield: 6.4 },
            { year: 2022, avgPrice: 142500, rentalYield: 6.3 },
            { year: 2023, avgPrice: 147200, rentalYield: 6.4 },
            { year: 2024, avgPrice: 152000, rentalYield: 6.5 },
        ],
        explanation: {
            summary:
                "Newcastle offers attractive rental yields and affordable entry points, but the underlying economic fundamentals present significant concerns. Population growth has stalled, employment rates trail the national average, and the region remains heavily dependent on the public sector and a limited number of large employers. The city is a high-yield, higher-risk proposition.",
            strengths: [
                "Among the highest rental yields of any major UK city, attractive for income-focused investors",
                "Very affordable entry point with average prices well below the national median",
                "Strong student demand from Newcastle and Northumbria universities",
            ],
            concerns: [
                "Population growth is near-stagnant, suggesting weak long-term demand trajectory",
                "Employment rate significantly below the national average, particularly outside the city centre",
                "Price growth has consistently underperformed both the national average and Northern peers",
            ],
            tradeoffs:
                "Newcastle represents a classic yield-versus-growth dilemma. The high rental returns are appealing on paper, but they partly reflect the low capital values caused by weak economic fundamentals. Investors gain cash flow but sacrifice capital appreciation potential.",
            assumptions: [
                "Yield calculations cover the Newcastle upon Tyne local authority area",
                "Employment data uses the Tyne and Wear NUTS2 region from NOMIS",
                "Population projections use ONS subnational estimates with a 10-year trend extrapolation",
                "Student demand is estimated from HESA enrolment data for the two main universities",
            ],
            limitations: [
                "The analysis cannot forecast the impact of potential devolution deals for the North East",
                "Sunderland and Gateshead dynamics spill across the Newcastle boundary but are not included",
                "Defence sector employment (BAE Systems) creates localised effects not captured at the regional level",
                "Energy transition investment in offshore wind may materially change long-term prospects but is not yet reflected in data",
            ],
        },
        warnings: [
            {
                type: "demand_fragility",
                severity: "high",
                title: "Structural Demand Weakness",
                narrative:
                    "Newcastle's net internal migration has been negative for three consecutive years, with more working-age adults leaving the region than arriving. Combined with below-replacement birth rates, this creates a genuine risk that housing demand could contract rather than grow in the medium term, undermining both rental occupancy and capital values.",
                historicalContext:
                    "Similar demographic patterns were observed in several former industrial cities in the 2000s, including Stoke-on-Trent and Burnley, where sustained population decline led to falling property values and rising void periods despite nominally high yields.",
            },
            {
                type: "industry_dependency",
                severity: "medium",
                title: "Public Sector Employment Vulnerability",
                narrative:
                    "The North East has the highest public sector employment share of any English region at approximately 31%. Newcastle as the regional capital is particularly exposed to central government spending decisions, departmental relocations, and civil service reform programmes.",
                historicalContext:
                    "The 2010 Comprehensive Spending Review resulted in the loss of approximately 8,500 public sector positions across Tyne and Wear, contributing to a 4.1% decline in Newcastle house prices between 2010 and 2012.",
            },
        ],
    },

    liverpool: {
        slug: "liverpool",
        factors: {
            employmentRate: 68,
            incomeLevel: 58,
            populationGrowth: 62,
            rentalYield: 82,
            priceGrowth: 65,
            industryDiversity: 60,
            demandStrength: 72,
            affordability: 78,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 105000, rentalYield: 7.2 },
            { year: 2015, avgPrice: 108200, rentalYield: 7.1 },
            { year: 2016, avgPrice: 112500, rentalYield: 7.0 },
            { year: 2017, avgPrice: 118000, rentalYield: 6.8 },
            { year: 2018, avgPrice: 122800, rentalYield: 6.7 },
            { year: 2019, avgPrice: 126500, rentalYield: 6.6 },
            { year: 2020, avgPrice: 128200, rentalYield: 6.7 },
            { year: 2021, avgPrice: 139000, rentalYield: 6.5 },
            { year: 2022, avgPrice: 152000, rentalYield: 6.3 },
            { year: 2023, avgPrice: 159800, rentalYield: 6.4 },
            { year: 2024, avgPrice: 168000, rentalYield: 6.5 },
        ],
        explanation: {
            summary:
                "Liverpool delivers some of the strongest rental yields in England and has seen improved economic momentum following significant waterfront regeneration. However, pockets of deprivation remain severe and employment fundamentals are mixed. The city is best suited to yield-focused investors with careful location selection within the L1–L8 postcode areas.",
            strengths: [
                "Exceptional rental yields, consistently among the highest in any English city",
                "Significant regeneration momentum particularly around the waterfront and Baltic Triangle",
                "Large student population from three universities creating reliable rental demand",
            ],
            concerns: [
                "Employment rate remains below the national average with pockets of very high unemployment",
                "Income levels are low, constraining potential for rent growth above inflation",
                "Parts of the city face persistent deprivation that limits investment appeal",
            ],
            tradeoffs:
                "Liverpool's appeal is fundamentally an income play. The yields are genuinely strong, but they compensate for below-average capital growth and higher management intensity. Success depends heavily on location selection — the difference between L1 and L8 postcodes is stark in terms of tenant quality and void rates.",
            assumptions: [
                "Yield data covers the Liverpool local authority area and uses Rightmove rental listings data",
                "Employment statistics use the Liverpool City Region Combined Authority area from NOMIS",
                "Regeneration impact is assessed using Liverpool Waters and Ten Streets master plan documentation",
                "Student housing demand estimates use UCAS acceptance data for 2023–24",
            ],
            limitations: [
                "Extreme intra-city variation means averages can be misleading — individual postcode analysis is essential",
                "The HMO licensing regime in Liverpool is stricter than many cities and affects achievable yields",
                "New-build apartment oversupply in the city centre may depress values in specific developments",
                "Energy performance certificate requirements may disproportionately affect Liverpool's older housing stock",
            ],
        },
        warnings: [],
    },

    sheffield: {
        slug: "sheffield",
        factors: {
            employmentRate: 64,
            incomeLevel: 52,
            populationGrowth: 45,
            rentalYield: 70,
            priceGrowth: 48,
            industryDiversity: 55,
            demandStrength: 58,
            affordability: 76,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 118000, rentalYield: 5.9 },
            { year: 2015, avgPrice: 119500, rentalYield: 5.8 },
            { year: 2016, avgPrice: 121200, rentalYield: 5.8 },
            { year: 2017, avgPrice: 124800, rentalYield: 5.7 },
            { year: 2018, avgPrice: 127500, rentalYield: 5.6 },
            { year: 2019, avgPrice: 129800, rentalYield: 5.6 },
            { year: 2020, avgPrice: 130500, rentalYield: 5.7 },
            { year: 2021, avgPrice: 138000, rentalYield: 5.5 },
            { year: 2022, avgPrice: 146500, rentalYield: 5.4 },
            { year: 2023, avgPrice: 149800, rentalYield: 5.5 },
            { year: 2024, avgPrice: 155000, rentalYield: 5.6 },
        ],
        explanation: {
            summary:
                "Sheffield presents a challenging investment landscape. The city is still navigating its post-industrial transition, with the decline of traditional steel and manufacturing sectors not yet fully offset by growth in digital and advanced manufacturing. Prices are affordable but growth has been amongst the weakest of any major English city over the past decade.",
            strengths: [
                "Very affordable entry point with average prices under £160,000",
                "Emerging advanced manufacturing hub around the AMRC and Olympic Legacy Park",
                "Two large universities providing consistent base-level rental demand",
            ],
            concerns: [
                "Population growth has stalled and is among the lowest of any major English city",
                "Income levels are well below the national median, limiting rent ceilings",
                "Price growth has significantly underperformed peers over every time horizon measured",
            ],
            tradeoffs:
                "Sheffield offers low entry costs but with correspondingly low growth expectations. The advanced manufacturing sector represents a genuine future catalyst, but its impact on the broader housing market remains unproven. This is a speculative, long-horizon investment requiring conviction in the city's economic transformation.",
            assumptions: [
                "Employment transition data uses BRES time series comparing 2014 and 2024 SIC code distributions",
                "AMRC economic impact estimates use Sheffield City Region LEP published assessments",
                "Price growth comparisons use ONS House Price Index seasonally adjusted data",
                "Population data uses ONS mid-year estimates for the Sheffield local authority area",
            ],
            limitations: [
                "The AMRC and advanced manufacturing corridor may transform the eastern suburbs but effects are currently localised",
                "University expansion plans at both Sheffield and Sheffield Hallam may alter demand patterns",
                "The analysis does not account for potential Levelling Up Fund allocations to South Yorkshire",
                "Flood risk in the Don Valley corridor is not incorporated into property risk assessments",
            ],
        },
        warnings: [
            {
                type: "industry_dependency",
                severity: "high",
                title: "Post-Industrial Transition Risk",
                narrative:
                    "Sheffield's economy remains in active transition from its historical dependence on steel and heavy manufacturing. While the Advanced Manufacturing Research Centre represents the future, the traditional manufacturing sector still employs 14% of the workforce — higher than any comparable city. Further contraction in traditional manufacturing could outpace job creation in new sectors.",
                historicalContext:
                    "The closure of major steel works in Rotherham and Sheffield between 2015 and 2016, affecting approximately 2,300 jobs, coincided with a 2.8% nominal price decline in S9 and S60 postcodes while the national market grew by 7.5% over the same period.",
            },
            {
                type: "demand_fragility",
                severity: "medium",
                title: "Weakening Demand Indicators",
                narrative:
                    "Transaction volumes in Sheffield have declined by 18% over the past three years, a sharper contraction than the national average of 11%. Average days on market have increased from 42 to 68, suggesting buyer interest is cooling more rapidly than in competing cities. This may indicate weakening demand fundamentals that could suppress prices.",
                historicalContext:
                    "Extended marketing periods and falling transaction volumes were reliable leading indicators of price corrections in northern cities during both the 2008–2009 financial crisis and the 2011–2012 double-dip recession.",
            },
        ],
    },

    nottingham: {
        slug: "nottingham",
        factors: {
            employmentRate: 72,
            incomeLevel: 60,
            populationGrowth: 70,
            rentalYield: 76,
            priceGrowth: 74,
            industryDiversity: 73,
            demandStrength: 75,
            affordability: 74,
        },
        factorWeights: {
            employmentRate: 0.15,
            incomeLevel: 0.12,
            populationGrowth: 0.1,
            rentalYield: 0.18,
            priceGrowth: 0.13,
            industryDiversity: 0.1,
            demandStrength: 0.12,
            affordability: 0.1,
        },
        priceHistory: [
            { year: 2014, avgPrice: 115000, rentalYield: 6.2 },
            { year: 2015, avgPrice: 119800, rentalYield: 6.1 },
            { year: 2016, avgPrice: 125500, rentalYield: 6.0 },
            { year: 2017, avgPrice: 132000, rentalYield: 5.9 },
            { year: 2018, avgPrice: 138200, rentalYield: 5.8 },
            { year: 2019, avgPrice: 143500, rentalYield: 5.7 },
            { year: 2020, avgPrice: 146200, rentalYield: 5.8 },
            { year: 2021, avgPrice: 158000, rentalYield: 5.6 },
            { year: 2022, avgPrice: 172500, rentalYield: 5.5 },
            { year: 2023, avgPrice: 182000, rentalYield: 5.6 },
            { year: 2024, avgPrice: 192000, rentalYield: 5.7 },
        ],
        explanation: {
            summary:
                "Nottingham delivers a well-rounded investment case with no extreme strengths or weaknesses. The city benefits from a balanced economy, strong student demand, and improving transport links via the tram network. It sits in a sweet spot between yield and growth, making it a pragmatic choice for diversified portfolios. Recent momentum has been particularly encouraging.",
            strengths: [
                "Well-balanced factor profile with no significant weaknesses to exploit",
                "Strong recent momentum with the highest year-on-year score improvement in the dataset",
                "Excellent yield-to-growth ratio offering both income and capital appreciation potential",
            ],
            concerns: [
                "Income levels remain below the national average, capping premium rental potential",
                "Employment rate, while improving, still trails the national average",
                "Some central postcodes have high concentrations of HMO properties affecting neighbourhood quality",
            ],
            tradeoffs:
                "Nottingham offers a balanced risk-reward profile that makes it suitable as a core portfolio holding. The absence of extreme scores in any direction means it lacks the upside potential of Manchester or the yield premium of Liverpool, but it also avoids the concentration risks and affordability concerns of those markets.",
            assumptions: [
                "Employment data covers the Nottingham and Derby NUTS2 region from the Annual Population Survey",
                "Tram network impact is assessed using price differential analysis for properties within 500m of stops",
                "HMO concentration data uses Article 4 Direction evidence base from Nottingham City Council",
                "Student demand estimates incorporate both University of Nottingham and Nottingham Trent enrolment data",
            ],
            limitations: [
                "The analysis does not separately model the Nottingham city centre apartment market versus suburban family housing",
                "Boots and other major employer headquarters decisions could materially impact the local economy",
                "East Midlands Freeport and Development Corporation effects are not yet reflected in the data",
                "Energy performance requirements may disproportionately affect Nottingham's Victorian terrace stock",
            ],
        },
        warnings: [],
    },
};

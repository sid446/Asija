'use client';
import React from 'react';
import AboutCard from './AboutCard';
import Beams from './Beams';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { useAppSelector } from '@/lib/store/hooks';

const About = () => {
	const { theme } = useTheme();
	const isLight = theme === 'light';
	
	// Get data from Redux store
	const aboutContent = useAppSelector((state) => state.about.content);
	const aboutCards = useAppSelector((state) => state.aboutCards.cards);
	const aboutLoading = useAppSelector((state) => state.about.loading);
	const cardsLoading = useAppSelector((state) => state.aboutCards.loading);

	// Use Redux data or provide fallbacks
	const content = aboutContent || {
		title: '',
		quote: '',
		description1: '',
		description2: '',
		description3: '',
		description4: ''
	};
	
	const cards = aboutCards || [];

	return (
		<section
			className={`relative w-full overflow-hidden transition-colors duration-300 mt-24 ${
				isLight ? 'bg-[#68a5bd]' : 'bg-slate-950'
			}`}
		>
			<div className="relative z-10 px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
				<div className="absolute inset-0 z-0">
					<Beams
						intensity={theme === 'light' ? 6 : 1.8}
						speed={0.5}
						animationType="rotate3d"
						colors={
							theme === 'light'
								? ['#009edb', '#009edb', '#60a5fa']
								: ['#009edb', '#009edb', '#0077b6']
						}
						distort={10}
						rayCount={10}
						mixBlendMode="normal"
					/>
				</div>

				<div
					className={`absolute inset-0 z-10 ${
						isLight ? 'bg-[#0578a6]/70' : 'bg-slate-950/40'
					}`}
				/>

				{/* Top Blue Gradient Overlay */}
				<div className="absolute inset-0 z-10 bg-linear-to-b from-[#009edb]/60 to-transparent pointer-events-none" />

				<div className="relative z-20 max-w-7xl mx-auto h-screen overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-5 lg:py-6">
					<div className="">
						<h1
							className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center transition-colors ${
								isLight ? 'text-black' : 'text-white'
							}`}
							style={{ color: 'white' }}
						>
							{content.title || 'Our Legacy of Trust'}
							<span className="text-[#009edb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
								.
							</span>
						</h1>

						<blockquote
							className={`
              mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-lg sm:text-2xl
              italic font-light leading-relaxed text-center
              ${'sm:border-l-4 sm:border-[#009edb] sm:pl-6 sm:text-left'} py-1 sm:py-2
              transition-colors 
            `} style={{color:'white'}}
						>
							{content.quote || 'Coming together is a beginning, keeping together is progress, working together is success.'}
						</blockquote>

						<div
							className={`mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-4 text-lg sm:text-2xl font-light leading-relaxed  text-center sm:text-left transition-colors ${
								isLight ? 'text-gray-700' : 'text-white'
							}`}
							style={{ color: 'white' }}
						>
							<p>{content.description1 || 'Asija & Associates LLP, Chartered Accountants was established on 1st April 1986 by our founder member CA. Uttam Chandra Asija with the aim of providing a wide range of Accounting and Financial services to clients in the Government, Corporate, and Private Sectors.'}</p>
							<p>{content.description2 || 'Over the years, the firm has been built around a team of professionals possessing vast experience in auditing, accounting, taxation, company law matters, and a host of other financial services. We assist clients in solving complex problems and support the growth of society at large.'}</p>

							<div className="hidden sm:block space-y-3 text-left">
								<p>{content.description3 || 'Our firm has not only augmented in knowledge and skills but has also established a landmark achievement by becoming the first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership.'}</p>
								<p className="mt-3 text-lg sm:text-2xl font-light ">
									{content.description4 || 'We, at Asija, aim to deliver quality to our stakeholders and strive to be the best at everything we do. We believe in working together to fulfill the needs of our clients beyond their expectations.'}
								</p>
							</div>
						</div>

						{/* Learn More Button */}
						<div className="mt-8 sm:mt-10 text-center">
							<Link href="/about">
								<InteractiveHoverButton text="Learn More About Us" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="relative z-30 -mt-12 sm:-mt-16 lg:-mt-20">
				<div
					className={`shadow-2xl transition-colors duration-300 ${
						isLight
							? 'bg-[#F0F9FF] border-t border-[#009edb]/20'
							: 'bg-slate-950 border-t border-[#009edb]/10'
					}`}
				>
					<div className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-20">
						<div className="max-w-7xl mx-auto">
							<h2
								className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8 sm:mb-12 transition-colors ${
									isLight ? 'text-gray-900' : 'text-white'
								}`}
							>
								Explore Our Strengths
								<span className="text-[#009edb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
									.
								</span>
							</h2>

							<div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-3 gap-4 mt-0  sm:mt-15 sm:gap-6 mb-10">
								{cards.map((card: any, index: number) => {
                                    // Navigate to about page with card parameter to open modal
                                    const cardParam = card._id || card.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

                                    return (
                                        <AboutCard
                                            key={index}
                                            image={card.image}
                                            title={card.title}
                                            description={card.description}
                                            buttonContent={card.buttonContent}
                                            isMobile={false}
                                            index={index}
                                            link={`/about?card=${cardParam}`}
                                        />
                                    );
                                })}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
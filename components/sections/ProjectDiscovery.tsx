'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Sparkles, 
  Globe, 
  Bot, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Send, 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  MessageSquare
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

type FormData = {
  projectType: string
  timeline: string
  budget: string
  description: string
  name: string
  email: string
  company?: string
  preferredContact?: string
}

const steps = [
  { 
    id: 1, 
    number: '01', 
    title: 'Project Scope', 
    subtitle: 'Category & Focus',
    description: 'Select the primary discipline for your project' 
  },
  { 
    id: 2, 
    number: '02', 
    title: 'Vision & Specs', 
    subtitle: 'Timeline & Details',
    description: 'Provide project parameters and detailed goals' 
  },
  { 
    id: 3, 
    number: '03', 
    title: 'Contact & Launch', 
    subtitle: 'Kickoff Details',
    description: 'How can I connect with you to review specs?' 
  },
]

const projectTypes = [
  { 
    value: 'web-app', 
    label: 'Full-Stack Web App', 
    badge: 'Next.js / React',
    description: 'High-performance interactive web application, dynamic frontend, and scalable backend.',
    icon: Globe,
    color: 'from-purple-500/20 to-violet-500/10'
  },
  { 
    value: 'ai-solution', 
    label: 'AI Agents & LLM Integration', 
    badge: 'LangChain / Gemini',
    description: 'Custom RAG pipelines, intelligent chatbot assistants, and agentic workflows.',
    icon: Bot,
    color: 'from-violet-500/20 to-fuchsia-500/10'
  },
  { 
    value: 'cloud-api', 
    label: 'Cloud & API Architecture', 
    badge: 'Node / Pinecone / SQL',
    description: 'Robust serverless architecture, RESTful / GraphQL APIs, and vector databases.',
    icon: Cpu,
    color: 'from-indigo-500/20 to-purple-500/10'
  },
  { 
    value: 'ui-ux', 
    label: 'Frontend Polish & 3D Web', 
    badge: 'Tailwind / Framer',
    description: 'Ultra-modern glassmorphic design systems, responsive 3D scenes, and animations.',
    icon: Layers,
    color: 'from-fuchsia-500/20 to-purple-500/10'
  },
  { 
    value: 'maintenance', 
    label: 'Refactoring & Optimization', 
    badge: 'Speed / Security',
    description: 'Code auditing, Core Web Vitals optimization, bug fixes, and feature expansions.',
    icon: ShieldCheck,
    color: 'from-purple-500/20 to-indigo-500/10'
  },
  { 
    value: 'custom', 
    label: 'Bespoke Custom Solution', 
    badge: 'Tailored Scope',
    description: 'Comprehensive end-to-end technical engineering suited to your custom vision.',
    icon: Code2,
    color: 'from-violet-500/20 to-purple-500/10'
  },
]

const timelines = [
  { value: '< 2 weeks', label: '< 2 Weeks', note: 'Fast Sprint / MVP' },
  { value: '1 - 2 months', label: '1 - 2 Months', note: 'Standard Scope' },
  { value: '3+ months', label: '3+ Months', note: 'Complex Platform' },
  { value: 'flexible', label: 'Flexible', note: 'Ongoing Advisory' },
]

const budgetRanges = [
  { value: 'starter', label: '< $1,000', note: 'Starter / MVP' },
  { value: 'growth', label: '$1K - $3K', note: 'Growth Platform' },
  { value: 'scale', label: '$3K - $8K', note: 'Full-Stack Solution' },
  { value: 'enterprise', label: '$8K+', note: 'Enterprise Suite' },
]

export default function ProjectDiscovery() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    trigger,
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: {
      projectType: 'web-app',
      timeline: '1 - 2 months',
      budget: 'growth',
      description: '',
      name: '',
      email: '',
      company: '',
      preferredContact: 'email'
    }
  })

  const selectedType = watch('projectType')
  const selectedTimeline = watch('timeline')
  const selectedBudget = watch('budget')
  const descriptionText = watch('description')

  const validateCurrentStep = async () => {
    if (currentStep === 1) {
      return await trigger('projectType')
    } else if (currentStep === 2) {
      return await trigger('description')
    }
    return true
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate high-reliability submission state
    await new Promise(resolve => setTimeout(resolve, 800))
    setSubmittedData(data)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const selectedTypeObj = projectTypes.find(t => t.value === selectedType) || projectTypes[0]
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="font-mono">COLLABORATION INITIATION</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-jetbrains)' }}>
            <span className="text-white">Project </span>
            <span className="gradient-accent heading-glow">Discovery</span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Outline your vision, tech needs, and project parameters. I will analyze your requirements and formulate a tailored architectural roadmap.
          </p>
        </motion.div>
      </div>

      {isSubmitted ? (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative rounded-3xl bg-[#080214]/90 backdrop-blur-2xl border border-purple-500/30 p-8 md:p-12 shadow-[0_0_60px_rgba(147,51,234,0.15)] text-center overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 p-[2px] mx-auto mb-6 shadow-xl shadow-purple-950/60"
            >
              <div className="w-full h-full rounded-2xl bg-[#0b031b] flex items-center justify-center">
                <Check className="w-10 h-10 text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
              </div>
            </motion.div>

            <h3 className="text-3xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              <span className="text-white">Inquiry </span>
              <span className="gradient-accent heading-glow-sm">Received!</span>
            </h3>

            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md mx-auto">
              Thank you, <span className="text-purple-300 font-semibold">{submittedData?.name || 'there'}</span>! Your project discovery details have been safely recorded.
            </p>

            {/* Submission Specs Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-purple-500/20 text-left mb-8 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-400">
                <span>Selected Track:</span>
                <span className="text-purple-200 font-medium">{selectedTypeObj.label}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Estimated Timeline:</span>
                <span className="text-slate-200 font-medium">{submittedData?.timeline}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Contact Email:</span>
                <span className="text-slate-200 font-medium">{submittedData?.email}</span>
              </div>
              <div className="pt-2 border-t border-purple-500/10 flex items-center gap-2 text-purple-300 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Guaranteed response turnaround within 24 hours.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="gradient"
                onClick={() => {
                  setIsSubmitted(false)
                  setCurrentStep(1)
                }}
              >
                Submit Another Inquiry
              </Button>
              <Button
                variant="secondary"
                as="a"
                href="#projects"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Multi-step Tracker */}
          <div className="mb-10 max-w-3xl mx-auto">
            {/* Step badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 relative mb-4">
              {steps.map((step) => {
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id)
                    }}
                    className={`text-left p-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                      isActive
                        ? 'bg-purple-500/15 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                        : isCompleted
                        ? 'bg-black/40 border-purple-500/25 hover:border-purple-400/40 cursor-pointer'
                        : 'bg-black/20 border-white/[0.05] opacity-60 cursor-default'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-500/40 scale-105'
                          : isCompleted
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 text-purple-300" /> : step.number}
                    </div>
                    <div className="hidden sm:block min-w-0">
                      <div className={`text-xs font-mono font-medium leading-none mb-1 ${isActive ? 'text-purple-300' : 'text-slate-400'}`}>
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {step.subtitle}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Glowing progress line */}
            <div className="h-1.5 bg-black/60 border border-purple-500/20 rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Form Glassmorphism Card */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative rounded-3xl bg-[#080214]/85 backdrop-blur-2xl border border-purple-500/25 p-6 sm:p-10 md:p-12 shadow-[0_0_50px_rgba(147,51,234,0.12)]">
              {/* Subtle inner corner glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                {/* Step Subheader */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-purple-500/15 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                      <span className="text-purple-400 font-mono text-xl">{steps[currentStep - 1].number}.</span>
                      <span>{steps[currentStep - 1].title}</span>
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {steps[currentStep - 1].description}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-purple-500/20 text-xs font-mono text-purple-300 self-start sm:self-auto">
                    <span>Step {currentStep} of {steps.length}</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* STEP 1: Project Type Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectTypes.map((type) => {
                          const Icon = type.icon
                          const isSelected = selectedType === type.value
                          return (
                            <label
                              key={type.value}
                              className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                                isSelected
                                  ? 'bg-purple-500/15 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)]'
                                  : 'bg-black/50 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/[0.06]'
                              }`}
                            >
                              <input
                                type="radio"
                                value={type.value}
                                {...register('projectType', { required: true })}
                                className="hidden"
                              />

                              {/* Card background subtle gradient */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                              <div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                                    isSelected
                                      ? 'bg-purple-500/25 border-purple-400 text-purple-300 shadow-md shadow-purple-950'
                                      : 'bg-black/60 border-purple-500/20 text-purple-400 group-hover:border-purple-400/50'
                                  }`}>
                                    <Icon className="w-5 h-5" />
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                      {type.badge}
                                    </span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                      isSelected
                                        ? 'border-purple-400 bg-purple-500 shadow-sm shadow-purple-500'
                                        : 'border-slate-700 bg-black/40'
                                    }`}>
                                      {isSelected && (
                                        <motion.div
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-2 h-2 bg-white rounded-full"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="font-semibold text-white text-base mb-1.5 group-hover:text-purple-200 transition-colors">
                                  {type.label}
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {type.description}
                                </p>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Vision, Specs & Timeline */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Timeline Selector */}
                      <div>
                        <label className="block text-sm font-medium mb-3 text-slate-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>Estimated Project Timeline</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {timelines.map((time) => {
                            const isSelected = selectedTimeline === time.value
                            return (
                              <button
                                key={time.value}
                                type="button"
                                onClick={() => setValue('timeline', time.value)}
                                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-purple-500/20 border-purple-400 shadow-sm shadow-purple-950/60'
                                    : 'bg-black/40 border-purple-500/20 hover:border-purple-500/40 text-slate-400'
                                }`}
                              >
                                <div className={`text-xs font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                  {time.label}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  {time.note}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Budget Bracket */}
                      <div>
                        <label className="block text-sm font-medium mb-3 text-slate-300 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-purple-400" />
                          <span>Anticipated Investment Range</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {budgetRanges.map((b) => {
                            const isSelected = selectedBudget === b.value
                            return (
                              <button
                                key={b.value}
                                type="button"
                                onClick={() => setValue('budget', b.value)}
                                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-purple-500/20 border-purple-400 shadow-sm shadow-purple-950/60'
                                    : 'bg-black/40 border-purple-500/20 hover:border-purple-500/40 text-slate-400'
                                }`}
                              >
                                <div className={`text-xs font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                  {b.label}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  {b.note}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Project Scope Description */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-slate-300">
                            Project Specifications & Goals <span className="text-purple-400">*</span>
                          </label>
                          <span className="text-xs font-mono text-slate-500">
                            {descriptionText?.length || 0} / 30 chars min
                          </span>
                        </div>
                        <Textarea
                          {...register('description', { 
                            required: 'Please provide details about your project goals and scope',
                            minLength: {
                              value: 30,
                              message: 'Please provide at least 30 characters to help me understand your project'
                            }
                          })}
                          rows={6}
                          placeholder="Describe the main goal of your project, required features, target users, or any specific tech preferences (e.g. Next.js, AI integrations, payment gateway, UI mockups, etc.)..."
                          error={errors.description?.message}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Contact Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          type="text"
                          icon={<User className="w-4 h-4" />}
                          {...register('name', { required: 'Your name is required' })}
                          placeholder="Mohammad Tauqeer"
                          error={errors.name?.message}
                          required
                        />

                        <Input
                          label="Work Email Address"
                          type="email"
                          icon={<Mail className="w-4 h-4" />}
                          {...register('email', { 
                            required: 'Work email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Please provide a valid email address'
                            }
                          })}
                          placeholder="tauqeer@example.com"
                          error={errors.email?.message}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Organization / Company (Optional)"
                          type="text"
                          icon={<Building2 className="w-4 h-4" />}
                          {...register('company')}
                          placeholder="Company, Agency or Startup name"
                        />

                        <Input
                          label="Project Link / Figma / Repo (Optional)"
                          type="text"
                          icon={<Globe className="w-4 h-4" />}
                          {...register('preferredContact')}
                          placeholder="https://..."
                        />
                      </div>

                      {/* Summary Snapshot */}
                      <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-300 font-mono">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>Track: <strong className="text-white">{selectedTypeObj.label}</strong></span>
                        </div>
                        <div className="text-slate-400 font-mono">
                          Timeline: <strong className="text-purple-300">{selectedTimeline}</strong>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Controls */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-purple-500/15 gap-4">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    variant="secondary"
                    className={`${currentStep === 1 ? 'invisible pointer-events-none' : ''}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      variant="primary"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={isSubmitting}
                      className="min-w-[180px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

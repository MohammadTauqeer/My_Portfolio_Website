'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Card from '@/components/ui/Card'

type FormData = {
  projectType: string
  description: string
  name: string
  email: string
  company: string
}

const steps = [
  { id: 1, title: 'Project Type', description: 'What are you looking for?' },
  { id: 2, title: 'Details', description: 'Tell us about your project' },
  { id: 3, title: 'Contact', description: 'How can we reach you?' },
]

const projectTypes = [
  { value: 'web-app', label: 'Website/Web Application', description: 'Full-featured web app with backend' },
  { value: 'blog-books', label: 'Blog Website/Books', description: 'Reading product' },
  { value: 'maintenance', label: 'Maintenance & Support', description: 'Ongoing support for existing projects' },
  { value: 'custom', label: 'Something Else', description: 'Custom project requirements' },
]

const budgetRanges = [
  { value: '5k-10k', label: '$5K - $10K', description: 'Small projects' },
  { value: '10k-25k', label: '$10K - $25K', description: 'Medium projects' },
  { value: '25k-50k', label: '$25K - $50K', description: 'Large projects' },
  { value: '50k+', label: '$50K+', description: 'Enterprise solutions' },
]

export default function ProjectDiscovery() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()

  const projectType = watch('projectType')

  const onSubmit = (data: FormData) => {
    // Handle form submission - integrate with your backend or email service
    setIsSubmitted(true)
    // Here you would typically send this data to your backend
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-400" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-slate-400 mb-6">
            Your project details have been received. I'll review your requirements and get back to you within 24 hours.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setCurrentStep(1)
            }}
          >
            Submit Another Project
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Professional Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Project Discovery
          </h2>
          <p className="text-slate-400 text-lg">
            Let's understand your needs and create something amazing together
          </p>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                currentStep >= step.id ? 'text-emerald-400' : 'text-slate-600'
              }`}
            >
              <div className="hidden sm:block text-sm font-medium mb-2">
                {step.title}
              </div>
              <div
                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-bold ${
                  currentStep >= step.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-2">{steps[currentStep - 1].title}</h3>
            <p className="text-slate-400 mb-8">{steps[currentStep - 1].description}</p>

            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <div className="space-y-3">
                {projectTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      projectType === type.value
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-700 hover:border-emerald-500/30 bg-slate-800/30'
                    }`}
                  >
                    <input
                      type="radio"
                      value={type.value}
                      {...register('projectType', { required: true })}
                      className="hidden"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg mb-1">{type.label}</div>
                        <div className="text-sm text-slate-400">{type.description}</div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          projectType === type.value
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-slate-600'
                        }`}
                      >
                        {projectType === type.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <Textarea
                {...register('description', { required: true, minLength: 50 })}
                rows={8}
                placeholder="Tell me about your project, goals, target audience, and any specific requirements..."
                error={errors.description ? 'Please provide at least 50 characters describing your project' : undefined}
              />
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="Mohammad Touqeer"
                  error={errors.name ? 'Name is required' : undefined}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  {...register('email', { 
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  })}
                  placeholder="Mohammadtauqeer@gmail.com"
                  error={errors.email ? 'Valid email is required' : undefined}
                  required
                />

                <Input
                  label="Company (Optional)"
                  type="text"
                  {...register('company')}
                  placeholder="Your Company"
                />
              </div>
            )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="secondary"
            className={currentStep === 1 ? 'opacity-0' : ''}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
              variant="primary"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gradient"
            >
              Submit Project
              <Check className="w-5 h-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

'use client'

import { MDXRemote as BaseMDXRemote, MDXRemoteProps } from 'next-mdx-remote'

import components from '@/components/common/MDXComponents'

export const MDXRemote = (props: MDXRemoteProps) => (
  <BaseMDXRemote {...props} components={components} />
)

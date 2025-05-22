'use client';
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link
} from '@heroui/react';
import { Gamepad2, Search } from 'lucide-react';

import "@theme-toggles/react/css/Around.css"
import { Around } from "@theme-toggles/react"
import { dataHeader } from './Header.data';
const Header = ({ currentPath }: { currentPath: string }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar className='bg-background text-foreground border-b border-b-muted' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand>
          <Gamepad2 className="text-accent mr-2" />
          <a href="/" className="font-extrabold text-2xl bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">GameBlog</a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {dataHeader.map(({ name, link }) => (
          <NavbarItem key={link} isActive={currentPath === link}>
            <Link
              href={link}
              className='hover:text-accent transition-colors duration-300'
            >
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex md:items-center md:justify-center">
          <button className="hover:text-accent transition-colors duration-300">
            <Search size={20} className='cursor-pointer hover:text-accent transition-colors duration-300'/>
          </button>
        </NavbarItem>
        <NavbarItem>
          <div id="theme-btn" className='flex items-center'>
            <Around
              className="[&>svg]:size-5 hover:text-accent"
              duration={750}
              placeholder="Toggle theme"
            />
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='bg-background text-foreground'>
        {dataHeader.map(({ name, link }) => (
          <NavbarMenuItem key={link}>
            <Link
              href={link}
              className='w-full hover:text-accent py-2 text-foreground transition-colors duration-300'
            >
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className="flex gap-4 mt-4">
            <Search size={20} className='cursor-pointer hover:text-accent transition-colors duration-300'/>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

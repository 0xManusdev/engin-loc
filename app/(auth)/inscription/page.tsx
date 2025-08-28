"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,   
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterClient } from "@/hooks/use-auth";

export default function InscriptionPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);        
    const [acceptTerms, setAcceptTerms] = useState(false)

    const registerClient = useRegisterClient();

    const [clientForm, setClientForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    });

    const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setClientForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };



    const handleClientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



        if (!acceptTerms) {
            alert("Veuillez accepter les conditions d'utilisation");
            return;
        }
        console.log(clientForm);

        try {
            await registerClient.mutateAsync({
                firstName: clientForm.firstName,
                lastName: clientForm.lastName,
                phone: clientForm.phone,
                email: clientForm.email,
                password: clientForm.password,
            });
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            alert("Une erreur est survenue lors de l'inscription");
        }
    };

    return (
        <div className="container py-12">
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Inscription</h1>
                    <p className="text-zinc-500">Créez votre compte pour commencer</p>
                </div>
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                Créez votre compte client pour accéder à notre catalogue
                                d&apos;équipements.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleClientSubmit}>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="Votre prénom"
                                            required
                                            value={clientForm.firstName}
                                            onChange={handleClientChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Votre nom"
                                            required
                                            value={clientForm.lastName}
                                            onChange={handleClientChange}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Numéro de téléphone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Votre numéro de téléphone"
                                        required
                                        value={clientForm.phone}
                                        onChange={handleClientChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Adresse email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Votre adresse email"
                                        required
                                        value={clientForm.email}
                                        onChange={handleClientChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Créez un mot de passe"
                                            required
                                            value={clientForm.password}
                                            onChange={handleClientChange}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">
                                                {showPassword
                                                    ? "Cacher le mot de passe"
                                                    : "Afficher le mot de passe"}
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirmer le mot de passe
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirmez votre mot de passe"
                                        required
                                        value={clientForm.password}
                                        onChange={handleClientChange}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        checked={acceptTerms}
                                        onCheckedChange={(checked) =>
                                            setAcceptTerms(checked as boolean)
                                        }
                                    />
                                    <label
                                        htmlFor="acceptTerms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        J&apos;accepte les{" "}
                                        <Link
                                            href="/conditions-utilisation"
                                            className="text-primary hover:underline"
                                        >
                                            conditions d&apos;utilisation
                                        </Link>
                                    </label>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full rounded-full"
                                    disabled={!acceptTerms}
                                    onSubmit={handleClientSubmit}
                                >
                                    S&apos;inscrire
                                </Button>
                                <p className="text-center text-sm text-zinc-500">
                                    Déjà un compte?{" "}
                                    <Link
                                        href="/connexion"
                                        className="text-zinc-900 hover:underline"
                                    >
                                        Se connecter
                                    </Link>
                                </p>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
        </div >
    );
}

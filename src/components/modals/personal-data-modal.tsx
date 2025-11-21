"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, Linkedin, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalDataModal({ open, onDismiss, userId }: { open: boolean, onDismiss: () => void, userId?: string }) {
    const [fileUploaded, setFileUploaded] = useState(false)
    const router = useRouter()

    const handleManualEntry = () => {
        router.push("/dashboard/complete-data")
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileUploaded(true)
            // aquí irá la IA en el futuro
        }
        router.push("/dashboard/complete-data?source=pdf")
    }

    const handleLinkedIn = () => {
        router.push("/dashboard/complete-data?source=linkedin")
    }

    const handleLater = () => {
        localStorage.setItem("personalDataModalDismissed", "true")
        onDismiss()
    }

    // Función para cerrar el modal que también marca como descartado
    const handleCloseModal = () => {
        localStorage.setItem("personalDataModalDismissed", "true")
        onDismiss()
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>¡Bienvenido a tu creador de CV profesional!</DialogTitle>
                    <DialogDescription>
                        Completa tu perfil personal para empezar más rápido.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-4 py-4">
                    {/* OPCIÓN 1 */}
                    <div className="flex-1 border cursor-pointer rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center text-center h-full">
                            <Upload className="h-8 w-8 mb-3" />
                            <h3 className="font-medium mb-2">Subir un CV existente</h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                Nuestra IA extraerá tu información.
                            </p>
                            <div className="mt-auto w-full">
                                <Input
                                    id="cv-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <Label
                                    htmlFor="cv-upload"
                                    className="cursor-pointer bg-primary text-sm px-4 py-2 rounded-md border hover:bg-primary transition-colors block text-center"
                                >
                                    Seleccionar archivo
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* OPCIÓN 2 */}
                    <div className="flex-1 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={handleLinkedIn}>
                        <div className="flex flex-col items-center text-center h-full">
                            <Linkedin className="h-8 w-8 mb-3" />
                            <h3 className="font-medium mb-2">Conectar con LinkedIn</h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                Importar desde LinkedIn.
                            </p>
                            <Button  className="mt-auto w-full">
                                Conectar
                            </Button>
                        </div>
                    </div>

                    {/* OPCIÓN 3 */}
                    <div className="flex-1 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={handleManualEntry}>
                        <div className="flex flex-col items-center text-center h-full">
                            <FileText className="h-8 w-8 mb-3" />
                            <h3 className="font-medium mb-2">Crear desde cero</h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                                Completa el formulario paso a paso.
                            </p>
                            <Button  className="mt-auto w-full">
                                Comenzar
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-3 border-t pt-6">
                    <p className="text-sm text-muted-foreground text-center">
                        También puedes completar tu perfil más tarde desde tu panel.
                    </p>
                    <Button
                        variant="secondary"
                        onClick={handleLater}
                        className="w-full py-6"
                    >
                        Continuar sin completar perfil
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
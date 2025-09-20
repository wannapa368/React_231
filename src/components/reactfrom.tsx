import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const MemberSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "กรุณาระบุคำนำหน้า"),
  firstName: z.string().min(1, "กรุณาระบุชื่อ"),
  lastName: z.string().min(1, "กรุณาระบุนามสกุล"),
  photo1: z.string().optional(),
  photo2: z.string().optional(),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  ministerPosition: z.string().optional(),
  ministryName: z.string().optional(),
  party: z.string().min(1, "กรุณาระบุสังกัดพรรคการเมือง"),
})

type Member = z.infer<typeof MemberSchema>

const STORAGE_KEY = "mp_members_v1"

const readStorage = (): Member[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Member[]) : []
  } catch {
    return []
  }
}

const writeStorage = (data: Member[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const fileToBase64 = (file: File) =>
  new Promise<string | null>((resolve, reject) => {
    if (!file) return resolve(null)
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

// Component
export default function MPMemberManager() {
  const [members, setMembers] = useState<Member[]>(() => readStorage())
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      photo1: "",
      photo2: "",
      workHistory: "",
      achievements: "",
      ministerPosition: "",
      ministryName: "",
      party: "",
    },
  })

  useEffect(() => {
    writeStorage(members)
  }, [members])

  const onSubmit = (data: Member) => {
    const parsed: Member = MemberSchema.parse({
      ...data,
      id: editingId ?? String(Date.now()),
    })

    if (editingId) {
      setMembers(members.map((m) => (m.id === editingId ? parsed : m)))
      setEditingId(null)
    } else {
      setMembers([parsed, ...members])
    }

    reset()
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Member
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    fileToBase64(file).then((b64) =>
      setValue(fieldName, b64 || "", { shouldValidate: true })
    )
  }

  const onEdit = (m: Member) => {
    setEditingId(m.id || null)
    reset(m)
  }

  const onDelete = (id: string | undefined) => {
    if (!id) return
    setMembers(members.filter((m) => m.id !== id))
  }

  const onClearAll = () => {
    if (confirm("ต้องการลบข้อมูลทั้งหมดหรือไม่?")) {
      setMembers([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        ระบบจัดการรายชื่อสมาชิกสภาผู้แทนราษฎร
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">คำนำหน้า</label>
            <input
              {...register("title")}
              className="w-full border p-2 rounded"
              placeholder="นาย / นาง / น.ส."
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">ชื่อ</label>
            <input
              {...register("firstName")}
              className="w-full border p-2 rounded"
              placeholder="ชื่อ"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">นามสกุล</label>
            <input
              {...register("lastName")}
              className="w-full border p-2 rounded"
              placeholder="นามสกุล"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">สังกัดพรรค</label>
            <input
              {...register("party")}
              className="w-full border p-2 rounded"
              placeholder="เช่น พรรคก้าวไกล"
            />
            {errors.party && (
              <p className="text-red-500 text-sm">{errors.party.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">ตำแหน่งรัฐมนตรี</label>
            <input
              {...register("ministerPosition")}
              className="w-full border p-2 rounded"
              placeholder=""
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">กระทรวง</label>
            <input
              {...register("ministryName")}
              className="w-full border p-2 rounded"
              placeholder=""
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700">ประวัติการทำงาน</label>
            <textarea
              {...register("workHistory")}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-medium text-gray-700">ผลงานที่ผ่านมา</label>
            <textarea
              {...register("achievements")}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">รูปถ่าย 1</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "photo1")}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">รูปถ่าย 2</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "photo2")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {editingId ? "บันทึกการแก้ไข" : "เพิ่มสมาชิก"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              reset()
              setEditingId(null)
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ยกเลิก
          </button>
        )}
      </form>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">รายชื่อสมาชิกทั้งหมด</h2>
        <button
          onClick={onClearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ลบทั้งหมด
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {members.length === 0 ? (
          <p className="text-gray-600">ยังไม่มีข้อมูลสมาชิก</p>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="bg-white p-4 rounded-lg shadow space-y-2 relative"
            >
              <div className="flex space-x-4">
                {m.photo1 && (
                  <img
                    src={m.photo1}
                    alt="รูปถ่าย1"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {m.photo2 && (
                  <img
                    src={m.photo2}
                    alt="รูปถ่าย2"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
              <p>
                <strong>
                  {m.title} {m.firstName} {m.lastName}
                </strong>
              </p>
              <p>พรรค: {m.party}</p>
              {m.ministerPosition && (
                <p>
                  ตำแหน่ง: {m.ministerPosition} กระทรวง {m.ministryName}
                </p>
              )}
              {m.workHistory && <p>ประวัติ: {m.workHistory}</p>}
              {m.achievements && <p>ผลงาน: {m.achievements}</p>}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onEdit(m)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => onDelete(m.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}